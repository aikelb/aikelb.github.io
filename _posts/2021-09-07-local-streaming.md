---
title: "Streaming local de vídeos en Unity3D"
categories: 
  - Guide
tags:
  - Unity3D
  - c-sharp
---

El streaming de vídeos puede resolver muchos problemas si intentamos utilizar algún plugin que espera una URL como entrada, especialmente si estamos intentando reproducir un video encriptado (AES + HLS) en iOS. 

Como pequeño extra, siguiendo [esta entrada de StackOverflow](https://stackoverflow.com/questions/25898922/handle-range-requests-with-httplistener) y [este código](https://www.codeproject.com/Articles/137979/Simple-HTTP-Server-in-C) como base, he conseguido montar un servidor local que soporte peticiones por rangos de bytes, lo que permite utilizar videos encriptados en un único fichero ```.ts```.

Podemos utilizarlo de la siguiente forma:
```csharp
//Start
var server = new MyHttpServer($"{Application.streamingAssetsPath}/Videos/", 8080);

//Stop
server.Stop();
```

Dejo por aquí una copia del script incluyendo los arreglos para que funcione en iOS/Mac.

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using UnityEngine;

// offered to the public domain for any use with no restriction
// and also with no warranty of any kind, please enjoy. - David Jeske. 

// simple HTTP explanation
// http://www.jmarshall.com/easy/http/

namespace Bend.Util
{
    public class HttpProcessor
    {
        public TcpClient socket;
        public HttpServer srv;

        private Stream inputStream;
        public StreamWriter outputStream;

        public String http_method;
        public String http_url;
        public String http_protocol_versionstring;
        public Hashtable httpHeaders = new Hashtable();


        private static int MAX_POST_SIZE = 10 * 1024 * 1024; // 10MB

        public HttpProcessor(TcpClient s, HttpServer srv)
        {
            this.socket = s;
            this.srv = srv;
        }


        private string streamReadLine(Stream inputStream)
        {
            int next_char;
            string data = "";
            while (true)
            {
                next_char = inputStream.ReadByte();
                if (next_char == '\n')
                {
                    break;
                }

                if (next_char == '\r')
                {
                    continue;
                }

                if (next_char == -1)
                {
                    Thread.Sleep(1);
                    continue;
                }

                ;
                data += Convert.ToChar(next_char);
            }

            return data;
        }

        public void process()
        {
            // we can't use a StreamReader for input, because it buffers up extra data on us inside it's
            // "processed" view of the world, and we want the data raw after the headers
            inputStream = new BufferedStream(socket.GetStream());

            // we probably shouldn't be using a streamwriter for all output from handlers either
            outputStream = new StreamWriter(new BufferedStream(socket.GetStream()));
            try
            {
                parseRequest();
                readHeaders();
                if (http_method.Equals("GET"))
                {
                    handleGETRequest();
                }
                else if (http_method.Equals("POST"))
                {
                    handlePOSTRequest();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.ToString());
                writeFailure();
            }

            outputStream.Flush();
            // bs.Flush(); // flush any remaining output
            inputStream = null;
            outputStream = null; // bs = null;            
            socket.Close();
        }

        public void parseRequest()
        {
            String request = streamReadLine(inputStream);
            string[] tokens = request.Split(' ');
            if (tokens.Length != 3)
            {
                throw new Exception("invalid http request line");
            }

            http_method = tokens[0].ToUpper();
            http_url = tokens[1];
            http_protocol_versionstring = tokens[2];

            Console.WriteLine("starting: " + request);
        }

        public void readHeaders()
        {
            Console.WriteLine("readHeaders()");
            String line;
            while ((line = streamReadLine(inputStream)) != null)
            {
                if (line.Equals(""))
                {
                    Console.WriteLine("got headers");
                    return;
                }

                int separator = line.IndexOf(':');
                if (separator == -1)
                {
                    throw new Exception("invalid http header line: " + line);
                }

                String name = line.Substring(0, separator);
                int pos = separator + 1;
                while ((pos < line.Length) && (line[pos] == ' '))
                {
                    pos++; // strip any spaces
                }

                string value = line.Substring(pos, line.Length - pos);
                Console.WriteLine("header: {0}:{1}", name, value);
                httpHeaders[name] = value;
            }
        }

        public void handleGETRequest()
        {
            srv.handleGETRequest(this);
        }

        private const int BUF_SIZE = 4096;

        public void handlePOSTRequest()
        {
            // this post data processing just reads everything into a memory stream.
            // this is fine for smallish things, but for large stuff we should really
            // hand an input stream to the request processor. However, the input stream 
            // we hand him needs to let him see the "end of the stream" at this content 
            // length, because otherwise he won't know when he's seen it all! 

            Console.WriteLine("get post data start");
            int content_len = 0;
            MemoryStream ms = new MemoryStream();
            if (this.httpHeaders.ContainsKey("Content-Length"))
            {
                content_len = Convert.ToInt32(this.httpHeaders["Content-Length"]);
                if (content_len > MAX_POST_SIZE)
                {
                    throw new Exception(
                        String.Format("POST Content-Length({0}) too big for this simple server",
                            content_len));
                }

                byte[] buf = new byte[BUF_SIZE];
                int to_read = content_len;
                while (to_read > 0)
                {
                    Console.WriteLine("starting Read, to_read={0}", to_read);

                    int numread = this.inputStream.Read(buf, 0, Math.Min(BUF_SIZE, to_read));
                    Console.WriteLine("read finished, numread={0}", numread);
                    if (numread == 0)
                    {
                        if (to_read == 0)
                        {
                            break;
                        }
                        else
                        {
                            throw new Exception("client disconnected during post");
                        }
                    }

                    to_read -= numread;
                    ms.Write(buf, 0, numread);
                }

                ms.Seek(0, SeekOrigin.Begin);
            }

            Console.WriteLine("get post data end");
            srv.handlePOSTRequest(this, new StreamReader(ms));
        }

        public void writeSuccess(string content_type = "text/html")
        {
            outputStream.WriteLine("HTTP/1.0 200 OK");
            outputStream.WriteLine("Content-Type: " + content_type);
            outputStream.WriteLine("Connection: close");
            outputStream.WriteLine("");
        }

        public void writeFailure()
        {
            outputStream.WriteLine("HTTP/1.0 404 File not found");
            outputStream.WriteLine("Connection: close");
            outputStream.WriteLine("");
        }
    }

    public abstract class HttpServer
    {
        protected int port;
        TcpListener listener;
        bool is_active = true;

        public HttpServer(int port)
        {
            this.port = port;
        }

        public void listen()
        {
            listener = new TcpListener(port);
            listener.Start();
            while (is_active)
            {
                TcpClient s = listener.AcceptTcpClient();
                HttpProcessor processor = new HttpProcessor(s, this);
                Thread thread = new Thread(new ThreadStart(processor.process));
                thread.Start();
                Thread.Sleep(1);
            }
        }

        public abstract void handleGETRequest(HttpProcessor p);
        public abstract void handlePOSTRequest(HttpProcessor p, StreamReader inputData);
    }

    public class MyHttpServer : HttpServer
    {
        
        private static IDictionary<string, string> _mimeTypeMappings = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase) {
            {".asf", "video/x-ms-asf"},
            {".asx", "video/x-ms-asf"},
            {".avi", "video/x-msvideo"},
            {".bin", "application/octet-stream"},
            {".cco", "application/x-cocoa"},
            {".crt", "application/x-x509-ca-cert"},
            {".css", "text/css"},
            {".deb", "application/octet-stream"},
            {".der", "application/x-x509-ca-cert"},
            {".dll", "application/octet-stream"},
            {".dmg", "application/octet-stream"},
            {".ear", "application/java-archive"},
            {".eot", "application/octet-stream"},
            {".exe", "application/octet-stream"},
            {".flv", "video/x-flv"},
            {".gif", "image/gif"},
            {".hqx", "application/mac-binhex40"},
            {".htc", "text/x-component"},
            {".htm", "text/html"},
            {".html", "text/html"},
            {".ico", "image/x-icon"},
            {".img", "application/octet-stream"},
            {".iso", "application/octet-stream"},
            {".jar", "application/java-archive"},
            {".jardiff", "application/x-java-archive-diff"},
            {".jng", "image/x-jng"},
            {".jnlp", "application/x-java-jnlp-file"},
            {".jpeg", "image/jpeg"},
            {".jpg", "image/jpeg"},
            {".js", "application/x-javascript"},
            {".m3u8", "application/x-mpegURL"},
            {".mml", "text/mathml"},
            {".mng", "video/x-mng"},
            {".mov", "video/quicktime"},
            {".mp3", "audio/mpeg"},
            {".mp4","video/mp4"},
            {".mpeg", "video/mpeg"},
            {".mpg", "video/mpeg"},
            {".msi", "application/octet-stream"},
            {".msm", "application/octet-stream"},
            {".msp", "application/octet-stream"},
            {".pdb", "application/x-pilot"},
            {".pdf", "application/pdf"},
            {".pem", "application/x-x509-ca-cert"},
            {".pl", "application/x-perl"},
            {".pm", "application/x-perl"},
            {".png", "image/png"},
            {".prc", "application/x-pilot"},
            {".ra", "audio/x-realaudio"},
            {".rar", "application/x-rar-compressed"},
            {".rpm", "application/x-redhat-package-manager"},
            {".rss", "text/xml"},
            {".run", "application/x-makeself"},
            {".sea", "application/x-sea"},
            {".shtml", "text/html"},
            {".sit", "application/x-stuffit"},
            {".swf", "application/x-shockwave-flash"},
            {".tcl", "application/x-tcl"},
            {".tk", "application/x-tcl"},
            {".ts", "video/MP2T"},
            {".txt", "text/plain"},
            {".war", "application/java-archive"},
            {".wbmp", "image/vnd.wap.wbmp"},
            {".wmv", "video/x-ms-wmv"},
            {".xml", "text/xml"},
            {".xpi", "application/x-xpinstall"},
            {".zip", "application/zip"}
        };
        
        public MyHttpServer(int port)
            : base(port)
        {
        }

        private string baseURL;
        private Thread server;

        public MyHttpServer(string baseURL, int port) : base(port)
        {
            this.baseURL = baseURL;
            server = new Thread(listen);
            server.Start();
        }

        public void Stop()
        {
            server.Abort();
        }

        public override void handleGETRequest(HttpProcessor p)
        {
            string filename = WebUtility.UrlDecode(p.http_url);
            var contentType = _mimeTypeMappings.TryGetValue(Path.GetExtension(filename), out string mime) ? mime : "application/octet-stream";
            var filePath = $"{baseURL}/{filename}";
            if (contentType.Contains("video") || contentType.Contains("audio"))
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    int startByte = -1;
                    int endByte = -1;
                    if (p.httpHeaders.Contains("Range"))
                    {
                        string rangeHeader = p.httpHeaders["Range"].ToString().Replace("bytes=", "");
                        string[] range = rangeHeader.Split('-');
                        startByte = int.Parse(range[0]);
                        if (range[1].Trim().Length > 0) int.TryParse(range[1], out endByte);
                        if (endByte == -1)
                            endByte = (int)fs.Length;
                        else
                            endByte++;
                    }
                    else
                    {
                        startByte = 0;
                        endByte = (int)fs.Length;
                    }

                    byte[] buffer = new byte[endByte - startByte];
                    fs.Position = startByte;
                    fs.Read(buffer, 0, endByte - startByte);
                    p.outputStream.AutoFlush = true;
                    p.outputStream.WriteLine("HTTP/1.0 206 Partial Content");
                    p.outputStream.WriteLine("Content-Type: " + mime);
                    p.outputStream.WriteLine("Accept-Ranges: bytes");
                    if (p.httpHeaders.Contains("Range"))
                    {
                        int totalCount = startByte + buffer.Length;
                        p.outputStream.WriteLine($"Content-Range: bytes {startByte}-{totalCount - 1}/{fs.Length}");
                        p.outputStream.WriteLine("Content-Length: " + buffer.Length);
                        p.outputStream.WriteLine("Connection: keep-alive");
                    }
                    else
                    {
                        p.outputStream.WriteLine("Content-Length: " + buffer.Length);
                        p.outputStream.WriteLine("Connection: close");
                    }
                    p.outputStream.WriteLine("");
                    p.outputStream.AutoFlush = false;
                    fs.Flush();
                    fs.Close();
                    p.outputStream.BaseStream.Write(buffer, 0, buffer.Length);
                    p.outputStream.BaseStream.Flush();
                    
                }
            }
            else
            {
                byte[] buffer = File.ReadAllBytes(filePath);
                p.outputStream.AutoFlush = true;
                p.outputStream.WriteLine("HTTP/1.0 200 OK");
                p.outputStream.WriteLine("Content-Type: " + mime);
                p.outputStream.WriteLine("Connection: close");
                p.outputStream.WriteLine("Content-Length: " + buffer.Length);
                p.outputStream.WriteLine("");

                p.outputStream.AutoFlush = false;
                p.outputStream.BaseStream.Write(buffer, 0, buffer.Length);
                p.outputStream.BaseStream.Flush();
            }
        }

        public override void handlePOSTRequest(HttpProcessor p, StreamReader inputData)
        {
            Console.WriteLine("POST request: {0}", p.http_url);
            string data = inputData.ReadToEnd();

            p.writeSuccess();
            p.outputStream.WriteLine("<html><body><h1>test server</h1>");
            p.outputStream.WriteLine("<a href=/test>return</a><p>");
            p.outputStream.WriteLine("postbody: <pre>{0}</pre>", data);
        }
    }

    public class TestMain
    {
        public static int Main(String[] args)
        {
            HttpServer httpServer;
            if (args.GetLength(0) > 0)
            {
                httpServer = new MyHttpServer(Convert.ToInt16(args[0]));
            }
            else
            {
                httpServer = new MyHttpServer(8080);
            }

            Thread thread = new Thread(new ThreadStart(httpServer.listen));
            thread.Start();
            return 0;
        }
    }
}
```

