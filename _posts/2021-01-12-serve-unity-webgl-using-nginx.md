---
title: "Servir build WebGL de Unity utilizando NGINX"
categories: 
  - Guide
---

Nota rápida para evitar problemas a la hora de servir una build WebGL con compresión utilizando NGINX.
El resumen es que tenemos estalecer los tipos MIME para cada tipo de fichero y la codificación correcta.

Con este fragmento debería ser suficiente, estableciendo correctamente el valor de la variable root.


```
location / {
  
  root /var/www/site.com/htdocs;
  
  index  index.html index.htm;
  autoindex on;
  autoindex_localtime on;
           
  location ~* ^.*\.(js)$ {
    types {}
    default_type application/javascript;
  }
           
  location ~* ^.*\.(wasm)$ {
    types {}
    default_type application/wasm;
  }
  location ~* ^.*\.(wasm.gz)$ {
    gunzip on;
    gzip off;
    types {}
    default_type application/wasm;
    add_header Content-Encoding gzip;
  }
  location ~* ^.*\.(framework.js.gz|js.gz)$ {
    gunzip on;
    gzip off;
    types {}
    default_type application/javascript;
    add_header Content-Encoding gzip;
  }
           
  location ~* ^.*\.(data.gz|symbols.json.gz)$ {
    gunzip on;
    gzip off;
    types {}
    default_type application/octet-stream;
    add_header Content-Encoding gzip;
  }
}
```

¡Gracias a los foros de Unity!
