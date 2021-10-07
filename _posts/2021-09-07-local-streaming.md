---
title: "Streaming local de vídeos en Unity3D"
categories: 
  - Guide
tags:
  - Unity3D
  - c-sharp
---

El streaming de vídeos puede resolver muchos problemas si intentamos utilizar algún plugin que espera una URL como entrada.

[Güney Aksakalli](https://gist.github.com/aksakalli) publicó hace unos años un [SimpleHTTPServer](https://gist.github.com/aksakalli/9191056) que permite servir el contenido de un directorio como `StreamingAssets` con una línea de código:

```csharp
var server = new SimpleHTTPServer($"{Application.streamingAssetsPath}/Videos/", 8080);
```

¡Muy útil y cómodo!


Dejo por aquí una copia del script:

```csharp
// MIT License - Copyright (c) 2016 Can Güney Aksakalli
// https://aksakalli.github.io/2014/02/24/simple-http-server-with-csparp.html

using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Net;
using System.IO;
using System.Threading;
using Debug = UnityEngine.Debug;


public class SimpleHTTPServer
{
    private static IDictionary<string, string> _mimeTypeMappings = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase) {
        #region extension to MIME type list
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
        {".zip", "application/zip"},
        #endregion
    };
    private Thread _serverThread;
    private string _rootDirectory;
    private HttpListener _listener;

    public int Port { get; private set; }

    /// <summary>
    /// Construct server with given port.
    /// </summary>
    /// <param name="path">Directory path to serve.</param>
    /// <param name="port">Port of the server.</param>
    public SimpleHTTPServer(string path, int port)
    {
        Initialize(path, port);
    }
 
    /// <summary>
    /// Construct server with suitable port.
    /// </summary>
    /// <param name="path">Directory path to serve.</param>
    public SimpleHTTPServer(string path)
    {
        //get an empty port
        TcpListener l = new TcpListener(IPAddress.Loopback, 0);
        l.Start();
        int port = ((IPEndPoint)l.LocalEndpoint).Port;
        l.Stop();
        Initialize(path, port);
    }
 
    /// <summary>
    /// Stop server and dispose all functions.
    /// </summary>
    public void Stop()
    {
        _serverThread.Abort();
        _listener.Stop();
    }
 
    private void Listen()
    {
        _listener = new HttpListener();
        _listener.Prefixes.Add("http://*:" + Port + "/");
        _listener.Start();
        while (true)
        {
            try
            {
                HttpListenerContext context = _listener.GetContext();
                Process(context);
            }
            catch (Exception ex)
            {
                Debug.LogError(ex);
            }
        }
    }
 
    private void Process(HttpListenerContext context)
        {
            string filename = WebUtility.UrlDecode(context.Request.Url.AbsolutePath.Substring(1));
            Console.WriteLine(filename);

            if (string.IsNullOrEmpty(filename))
            {
                {
                    try
                    {
                        string responseString = string.Join("\n", Directory.GetFiles(_rootDirectory, @"*.*", SearchOption.AllDirectories));
                        byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
                        context.Response.ContentLength64 = buffer.Length;
                        Stream output = context.Response.OutputStream;
                        output.Write(buffer, 0, buffer.Length);

                        context.Response.StatusCode = (int)HttpStatusCode.OK;
                        context.Response.OutputStream.Flush();
                    }
                    catch
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    }
                }
            }

            filename = Path.Combine(_rootDirectory, filename);

            if (File.Exists(filename))
            {
                try
                {
                    Stream input = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read);
                    

                    context.Response.ContentType = _mimeTypeMappings.TryGetValue(Path.GetExtension(filename), out string mime) ? mime : "application/octet-stream";
                    context.Response.ContentLength64 = input.Length;
                    context.Response.StatusCode = (int)HttpStatusCode.OK;

                    if (context.Request.HttpMethod != "HEAD")
                    {
                        byte[] buffer = new byte[1024 * 16];
                        int nbytes;
                        context.Response.SendChunked = input.Length > 1024 * 16;
                        while ((nbytes = input.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            context.Response.OutputStream.Write(buffer, 0, nbytes);
                        }
                    }
                    context.Response.OutputStream.Flush();
                    context.Response.Close();
                }
                catch (Exception e)
                {
                    Debug.LogError(e);
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                }
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            }

            context.Response.OutputStream.Close();
        }
 
    private void Initialize(string path, int port)
    {
        _rootDirectory = path;
        Port = port;
        _serverThread = new Thread(Listen);
        _serverThread.Start();
        //Debug.Log($"Listening {path} at {port}");
    }
 
 
}
```

