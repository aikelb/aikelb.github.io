var store = [{
        "title": "Rasperry Pi & Archlinux",
        "excerpt":"Hace poco me he comprado una Raspberry y como tenía ganas de probar Archlinux he aprovechado la ocasión para montar el combo de Raspberry (Modelo 512Mb) + Arch + Fluxbox. Y estas son algunas de las piedras que encontré por el camino: Configurar WIFI (WPA) en el arranque Nota: En...","categories": ["Software"],
        "tags": [],
        "url": "/software/raspberry-pi-archlinux/",
        "teaser": null
      },{
        "title": "Convertir de FLAC a MP3 en Linux",
        "excerpt":"Bajo Ubuntu o similares podemos realizar esta conversión con unas pocas líneas. El siguiente script convertirá todos los ficheros FLAC esten en el mismo directorio a MP3 con el codificador de LAME. #!/bin/bash for a in *.flac; do &lt; /dev/null avconv -i \"$a\" -b 256k \"${a[@]/%flac/mp3}\" done Para que funcione...","categories": ["Software"],
        "tags": [],
        "url": "/software/flac-a-mp30/",
        "teaser": null
      },{
        "title": "NCDU: NCurses Disk Usage",
        "excerpt":"NCDU es una herramienta estupenda para analizar el uso del disco duro en terminal, especialmente útil al gestionar servidores via SSH. De forma muy cómoda podemos descubrir donde están los ficheros más pesados del disco duro, entre otras tantas funcionalidades. Lo mejor es que podemos descargarlo a golpe de repositorio...","categories": ["Software"],
        "tags": [],
        "url": "/software/ncdu/",
        "teaser": null
      },{
        "title": "Hollywood Terminal",
        "excerpt":"¿Quién no necesita en algún momento de su vida un terminal que parezca que haga cosas importantísimas? ¡Hasta Hollywood lo necesita! Pues hace ya un tiempo, Dustin Kirkland creó una pequeña aplicación que hace eso mismo y tiene esta pinta: Tiene preparado hasta un repositorio preparado para instalarlo fácilmente Ubuntu:...","categories": ["Software"],
        "tags": [],
        "url": "/software/hollywood-terminal/",
        "teaser": null
      },{
        "title": "Pinceles para Krita",
        "excerpt":"No soy ilustrador, ni dibujante, ni un ‘artista del pincel’, pero Krita es probablemente el mejor software gratuito para bocetar y pintar que hay disponible, porque lo tiene todo: Multiplataforma. Soporte de tabletas. Open Source. Un montón de prestaciones. Por otro lado, David Revoy (autor también de la ilustración del...","categories": ["Software"],
        "tags": [],
        "url": "/software/pinceles-krita/",
        "teaser": null
      },{
        "title": "DNSTwist",
        "excerpt":"DNSTwist es una herramienta que puede ayudarnos a analizar los errores más comunes al escribir un dominio web, y al mismo tiempo busca dominios similares. Según su propia descripción, esto puede ayudarnos a analizar dominios adversarios y evitar ataques phising. Aquí podemos verlo en acción: La plataforma principal de desarrollo...","categories": ["Software"],
        "tags": [],
        "url": "/software/dnstwist/",
        "teaser": null
      },{
        "title": "Códigos de caracteres",
        "excerpt":"Cuando hago presentaciones en Reveal.js y necesito algún símbolo (como por ejemplo flechas) intento utilizar sus códigos HTML para evitar incluir imágenes.   En Character-Code hay un listado brutal de códigos con su representación.   ¡Fácil y para toda la familia!  ","categories": ["Resource"],
        "tags": [],
        "url": "/resource/codigos-de-caracteres/",
        "teaser": null
      },{
        "title": "Ubuntu en un Macbook Pro 6,2",
        "excerpt":"Con la nueva versión de MacOS Mojave, mi MacbookPro de mediadios de 2010 dejará de tener soporte por parte de Apple. Hasta mucho ha tardado la gran manzana en jubilarlo. No tengo planes de dejar de utilizar el portátil, así que (mientras Nvidia me deje) Linux se encargará de mantenerlo...","categories": ["Guide"],
        "tags": [],
        "url": "/guide/ubuntu-mbpro/",
        "teaser": null
      },{
        "title": "Edición de video y VFX",
        "excerpt":"La comodidad que ofrece la Creative Suite de Adobe es difícil de igualar, pero el precio es una barrera de entrada importante. Su modelo basado en suscripción lo hace menos atractivo aún, así que no me ha quedado otra que buscar alternativas. Editores de video Hay bastantes opciones open source....","categories": ["Software"],
        "tags": [],
        "url": "/software/davinci-resolve/",
        "teaser": null
      },{
        "title": "XnConvert",
        "excerpt":"XnConvert es un procesador de imágenes gratuito y multiplataforma que permite aplicar acciones a lotes de imágenes. Entre las acciones podemos encontrar: Máscaras Recortes Reescalado Extracción de canales Rotación Establecer DPI Reemplazar color Marca de agua Es bastante versátil y soporta más de 70 formatos de imágenes. Además, en la...","categories": ["Software"],
        "tags": [],
        "url": "/software/xn-convert/",
        "teaser": null
      },{
        "title": "Typora - editor markdown",
        "excerpt":"Typora es un Editor de texto minimalista mediante markdown. Aparte de la edición, una de las cosas más interesantes es la variedad de formatos a los que exporta: PDF, HTML, docx, OpenOffice, LaTeX, MediaWiki, Epub. Es gratuito mientras esté en beta y además es multiplataforma. Además de los binarios para...","categories": ["Software"],
        "tags": [],
        "url": "/software/typora-editor/",
        "teaser": null
      },{
        "title": "L2TP IPsec VPN en Ubuntu",
        "excerpt":"Hace poco tuve que conectarme a una VPN bajo el protocolo L2TP mientras trabajaba en Ubuntu. Por defecto este protocolo no está soportado en Ubuntu 18.10, pero se puede instalar desde el repositorio main con un simple: sudo apt install network-manager-l2tp-gnome Después de instalar este paquete podremos configurar este tipo...","categories": ["Guide"],
        "tags": [],
        "url": "/guide/l2tp-ubuntu/",
        "teaser": null
      },{
        "title": "Intellisense en Ubuntu con Unity 2018+",
        "excerpt":"Mientras utilizaba VSCode con Unity en Ubuntu 18.10 como editor principal, al llegar las últimas actualizaciones dejó de funcionar el autocompletado con un fantástico: The reference assemblies for framework \".NETFramework,Version=v3.5\" were not found. Al parecer la última versión no se instala correctamente como dependencia desde VSCode, así que instalar la...","categories": ["Guide"],
        "tags": [],
        "url": "/guide/intellisense-unity-linux/",
        "teaser": null
      },{
        "title": "Migrando a easyengine v4",
        "excerpt":"¡easyengine se ha actualizado y ahora funciona con docker! Es una actualización muy potente, pero que cambia mucho la forma de trabajar (especialmente con la base de datos). Empecemos con la migración a otro servidor paso a paso. Paso 1: Exportar el contenido y la base de datos. Todo el...","categories": ["Guide"],
        "tags": [],
        "url": "/guide/migrando-a-easyengine-v4/",
        "teaser": null
      },{
        "title": "Servir build WebGL de Unity utilizando NGINX",
        "excerpt":"Nota rápida para evitar problemas a la hora de servir una build WebGL con compresión utilizando NGINX. El resumen es que tenemos estalecer los tipos MIME para cada tipo de fichero y la codificación correcta. Con este fragmento debería ser suficiente, estableciendo correctamente el valor de la variable root. location...","categories": ["Guide"],
        "tags": [],
        "url": "/guide/serve-unity-webgl-using-nginx/",
        "teaser": null
      },{
        "title": "Streaming local de vídeos en Unity3D",
        "excerpt":"El streaming de vídeos puede resolver muchos problemas si intentamos utilizar algún plugin que espera una URL como entrada. Güney Aksakalli publicó hace unos años un SimpleHTTPServer que permite servir el contenido de un directorio como StreamingAssets con una línea de código: var server = new SimpleHTTPServer($\"{Application.streamingAssetsPath}/Videos/\", 8080); ¡Muy útil...","categories": ["Guide"],
        "tags": ["Unity3D","c-sharp"],
        "url": "/guide/local-streaming/",
        "teaser": null
      }]
