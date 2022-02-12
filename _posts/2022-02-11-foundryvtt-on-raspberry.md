---
title: "FoundryVTT + Raspberry Pi 3"
categories: 
  - Guide
tags:
  - DnD
  - FoundryVTT
  - Raspberry
---

Notas para la instalación de FoundryVTT en la Raspberry, por si pasa lo peor.

## Sistema Operatio:

Instalar Pi OS en una tarjeta SD o disco duro externo. El [Raspberry Pi Imager](https://www.raspberrypi.org/software/) facilita bastante las cosas y permite descargar la última versión de Raspbery Pi OS en 64 bits.

![Pi Imager](/assets/posts/pi-imager.png){: .center-image}

Instalamos la imagen y entramos en el sistema, donde aprovechamos para conectarnos a internet y activar el SSH desde ajustes.


## Instalación

1. Creamos la carpeta `data`, donde seguardarán todos los datos de Foundry.
```
cd $HOME
mkdir foundry/data
```
Ahora tenemos dos opciones: vitualizar Foundry usando Docker o la instalación local tradicional.

### Usando Docker

1. Seguimos los [pasos](https://docs.docker.com/engine/install/debian/#install-using-the-convenience-script) para instalar Docker aprovechando el script oficial.
2. Lo iniciamos `systemctl start docker`
3. E instalamos docker-compose usando `sudo apt install docker-compose`. 
4. Permitimos a usuarios no-root lanzar contenedores de docker por comodidad con:
```
sudo usermod -aG docker [user_name]
```
Para el usuario por defecto sería:
```
sudo usermod -aG docker pi
```

5. Ahora creamos el fichero `~/foundry/docker-compose.yml` :

```
---
version: "3.3"

services:
  foundry:
    image: felddy/foundryvtt:release
    restart: "unless-stopped"
    hostname: [url]
    volumes:
      - type: bind
        source: ./data
        target: /data
    environment:
      - FOUNDRY_USERNAME=[username]
      - FOUNDRY_PASSWORD=[password]
      - FOUNDRY_ADMIN_KEY=[admin-key]
      - FOUNDRY_LICENSE_KEY=[license]
      - CONTAINER_CACHE=/data/container_cache
    ports:
      - target: 30000
        published: 30000
        protocol: tcp
```

6. Terminamos lanzando el contenedor con: `docker-compose up -d`

7. Para actualizar el contenedor en el futuro podemos utilizar:
```
docker-compose pull
//o
docker pull felddy/foundryvtt:release
```
Y volvemos a lanzar el contenedor con `docker-compose up -d`

### Instalación local con NodeJS

1. Instalar dependencias
```
sudo apt install -y libssl-dev
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs
```
2. Descargar y configurar FoundryVTT siguiendo los pasos [instalación](https://foundryvtt.com/article/installation/) de la web oficial.

3. Creación del servicio en `/etc/systemd/system/foundryvtt.service`:
```
[Unit]
Description=Foundry VTT
After=network.target

[Service]
ExecStart=/usr/bin/node /home/pi/foundry/resources/app/main.js --dataPath=/home/pi/foundry/data/
WorkingDirectory=/home/pi/foundry
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
Y podremos lanzar y parar FoundryVTT con:
```
sudo service foundryvtt start
sudo service foundryvtt stop
```

## Servidor

1. Instalamos nginx:
```
sudo apt-get update
sudo apt-get install nginx
```

2. Creamos el fichero de configuración para nuestro dominio en `/etc/nginx/sites-available/your.hostname.com` :
```
server {

    # Enter your fully qualified domain name or leave blank
    server_name  your.hostname.com;

    # Listen on port 80 without SSL certificates
    listen 80;

    # Sets the Max Upload size to 300 MB
    client_max_body_size 300M;

    # Proxy Requests to Foundry VTT
    location / {

	# Set proxy headers
	proxy_set_header Host $host;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;

	# These are important to support WebSockets
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "Upgrade";

	# Make sure to set your Foundry VTT port number
	# This should match the published port in your docker-compose file
	proxy_pass http://0.0.0.0:30000;
    }
}
```

3. Activamos el sitio y revisamos la configuración :
```
# Enable new site
cd /et c/nginx/sites-enabled
sudo ln -s ../sites-available/your.hostname.com .

# Test your configuration file
sudo service nginx configtest

# View configuration errors (if the configtest was not OK)
sudo nginx -t

# Restart Nginx
sudo service nginx restart
```

Y si todo va bien, ha llegado la hora de instalar un certificado SSL usando [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=debianbuster)

## DNS dinámicas
Gracias a un pequeño [script](https://github.com/rmarchant/gandi-ddns) podemos actualizar las dns de un dominio de gandi automáticamente.

## Seguridad
1. Instalamos el cortafuegos con `sudo apt -y install ufw`
2. Permitimos el tráfico web:
```
sudo ufw allow 80
sudo ufw allow 443
#En las nuevas versiones el SSH ya debería estar permitido.
```
3. Activamos el cortafuegos `sudo ufw enable`.
4. Instalamos el servicio Fail2ban: `apt install fail2ban`
5. Copiamosla configuración por defecto `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`
6. Lo lanzamos: `sudo service fail2ban start`

## Copias de seguridad
[MegaCMD](https://mega.nz/cmd)

## Problemas
### Evitar que la WiFi de la Raspberry se desconecte
El controlador WiFi de la Raspberry tiene activado por defecto el ahorro de energía.

Comando para leer el valor actual:
```
sudo iw wlan0 get power_save
```
Comando para desactivarlo:
```
sudo iw wlan0 set power_save off
```

Para hacer el cambio permanente hay que añadir lo siguiente al fichero `/etc/rc.local` (antes del exit 0!):
```
/sbin/iw dev wlan0 set power_save off
```

## Referencias

- [https://github.com/orangetruth/foundryvtt-raspberry-pi](https://github.com/orangetruth/foundryvtt-raspberry-pi)
- [https://www.raspberrypi.org/documentation/configuration/security.md](https://www.raspberrypi.org/documentation/configuration/security.md)
- [https://www.weigu.lu/sb-computer/raspi_tips_tricks/index.html#link_9](https://www.weigu.lu/sb-computer/raspi_tips_tricks/index.html#link_9)
- [https://martinpilon.ca/foundry-on-pi/](https://martinpilon.ca/foundry-on-pi/)
- [https://dracoli.ch/posts/foundry-rpi/](https://dracoli.ch/posts/foundry-rpi/)
