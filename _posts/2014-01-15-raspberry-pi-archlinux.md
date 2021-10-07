---
title: "Rasperry Pi & Archlinux"
header:
  image: assets/posts/archlinux.jpg
categories: 
  - Software
---
Hace poco me he comprado una Raspberry y como tenía ganas de probar Archlinux he aprovechado la ocasión para montar el combo de Raspberry (Modelo 512Mb) + Arch + Fluxbox.

Y estas son algunas de las piedras que encontré por el camino:

## Configurar WIFI (WPA) en el arranque

Nota: En mi caso utilicé un conector wifi que funciona sin necesidad de instalar drivers. Hay una lista bastante completa de adaptadores compatibles y sus requisitos [aquí](http://elinux.org/RPi_USB_Wi-Fi_Adapters).


Configuraremos la red de forma manual y activaremos el servicio para que se conecte automáticamente en el arranque. En nuestro caso el nombre de la interfaz es wlan0.

### 1. Empezamos creando el archivo de configuración de la red con encriptación WPA a la que queremos conectarnos:

  ```shell
   wpa_passphrase ESSID "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
  ```

  Es importante añadir el nombre de la interfaz en el nombre del fichero, lo utilizará el servicio wpa_supplicant en el arranque.

### 2. Para que funcione correctamente debemos tener instalado ffmpeg y libavcodec:

  ```shell
   wpa_supplicant -iwlan0 -c /etc/wpa_supplicant/wpa_supplicant.wlan0.conf & dhcpcd wlan
  ```

  En algunos casos, aunque consigamos conectarnos al punto de acceso y obtengamos una IP válida, si no podemos conectarnos a ninguna web tal vez necesitemos añadir un servidor DNS al fichero **/etc/hosts**. Si no estás seguro de la IP del servidor de DNS de tu proveedor siempre puedes utilizar uno de los servidores de Google:

  ```shell
  #Ejemplo de archivo hosts
  127.0.0.1         localhost
  8.8.8.8
  ```

### 3. Para terminar activamos los servicios wpa_supplicant y dhcpcd en el arranque:

```shell
systemctl enable wpa_supplicant@wlan0
systemctl enable dhcpcd
```

Así, en cada inicio, la raspberry se conectará automáticamente a la red configurada para la interfaz wlan0 con los datos que hemos creado en el fichero wpa_supplicant-wlan0.conf.
