---
title: "Migrando a easyengine v4"
header:
  image: assets/posts/easyengine.jpg
categories: 
  - Guide
---

¡[easyengine](https://easyengine.io/) se ha actualizado y ahora funciona con docker!
Es una actualización muy potente, pero que cambia mucho la forma de trabajar (especialmente con la base de datos).

Empecemos con la migración a otro servidor paso a paso.

# Paso 1: Exportar el contenido y la base de datos.

Todo el contenido relevante de un sitio web wordpress (entradas, plugins, temas, imágenes...) está almacenado dentro del directorio **wp-content**.
Lo podemos comprimir utilizando *tar* fácilmente:

```
tar -zcvf ~/site_name.tar.gz ./wp-content
```

Es importante el directorio desde el que hacemos la compresión, ya que al descomprimir mantendrá todas los directorios tal cual se han comprimido.

Lo siguiente es exportar la BBDD. Es bastante fácil utilizando el usuario root, y ya que estamos, lo comprimimos:

```
sudo mysqldump -u root dbname > dbname.sql
tar -zcvf dbname.sql.tar.gz dbname.sql
```

# Paso 2: Copiar el contenido al servidor nuevo

Esto podemos hacerlo como más cómodo nos sea. Hay quien prefiere rsync, o ftp. Para mi lo más fácil es scp:
Desde el servidor nuevo podríamos hacer:

```
scp user@oldserver.com:~/*.tar.gz .
```

# Paso 3: Instalar easyengine y crear el sitio web

Como indican en la web de easyengine, su instalación es muy sencilla:
```
wget -qO ee rt.cx/ee4 && sudo bash ee
```

Cuando termine, podremos crear el sitio web con cache en una línea:

```
ee site create domain.com --type=wp --cache=wpredis
```

# Paso 4: Restauramos los datos
Empezamos descomprimiendo el contenido del sitio en su nuevo directorio y actualizando los permisos de la carpeta:

```
cd opt/easyengine/sites/domain.com/app/htdocs
tar -zxvf archive_name.tar.gz
chown -R www-data:www-data wp-content
```

Restaurar la BBDD tiene truco. Ya no podemos acceder a mysql como en el servidor anterior porque ahora es un contenedor de docker.
Lo primero que necesitamos es obtener el identificador del container:

```
# docker ps
CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                                      NAMES
f3c3a1fc727c        easyengine/mariadb:v4.0.0       "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        3306/tcp                                   services_global-db_1
```

En el listado buscamos el id del contenedor de mariadb.
No sabemos cual es la contraseña de root de la base de datos, pero podemos conectarnos al contenedor con los datos del blog que acabamos de montar con algo de este estilo:

```
docker exec -i f3c3a1fc727c mysql -udbuser -pdbpass --database=dbname < dump.sql
```

Si por lo que fuera, necesitamos acceder a la BBDD como root, podemos usar:
```
docker exec -it f3c3a1fc727c bash -c 'mysql -uroot -p${MYSQL_ROOT_PASSWORD}'
```

Y no estaría de más limpiar el historial de comandos que contiene la contraseña de las BBDD:
```
history -c
```

# Paso 5: Activamos el SSL

Una vez hayamos cambiado el dominio y se haya propagado por los servidores de DNS, podremos activar el SSL con letsencrypt:
```
ee site update example.com --ssl=le

# O si queremos * subdominios:
# ee site update example.com --ssl=le --wildcard
```

# Otros comandos y resolución de problemas

## Renovación de caché
Si necesitamos forzar una renovación de la caché y no podemos acceder al panel de admin, podemos relanzar el servicio de redis con:

```
ee service restart redis
```

## Reinicios del servidor
Hay veces que al reiniciar el servidor la BBDD o algún otro servicio de easyengine no arranca correctamente.
Es un bug conocido, por ahora una forma de evitarlo es reiniciando de nuevo o ejecutando:

```
ee service enable db --force
```

## Redirecciones www
Por algún motivo aunque tengamos bien configurado el subdominio www, nginx no hace bien la redirección para servirlo. Especialmente cuando hay varias páginas en un mismo servidor.
Esto puede ser porque falte el fichero en el servicio de nginx-proxy que resuelve esta redirección.
El archivo debe estar en la ruta ```/opt/easyengine/services/nginx-proxy/conf.d/domain.com-redirect.conf``` y su contenido debería ser:
```
server {
  listen  80;
  server_name  www.domain.com;
  return  301 http://domain.com$request_uri;
}
```

Una vez lo tengamos, con recargar el servicio debería bastar:
```
ee service reload nginx-proxy
```

## Error nginx: [emerg] host not found in upstream
Este problema se puede dar por dos motivos: 
### 1. Nginx intenta lanzarse y la dependencia php-fpm no está en marcha.
En el docker-compose de cada sitio se establece esa dependencia, pero durante el arranque a veces puede fallar el inicio de una de las dependencias. La solución más rápida es desactivar y volver a activar el sitio. De esta forma easyengine parará y elminará todas las instancias de docker y las volverá a lanzar en el orden correcto.
```
ee site disable domain.com
ee site enable domain.com
```
### 2. No se puede resolver las dns del dominio.
En las últimas versiones de Nginx, la validación de las dns del dominio pueden comprobarse por IPv6. 
Para arreglarlo, simplemente hay que configurar correctamente un registro AAAA apuntando a la IPv6 de nuestro servidor en @.

[Fuente](https://venturedawn.com/blogging/migrate-wordpress-easyengine-v4/2667/).
[Error 502](https://community.easyengine.io/t/502-bad-gateway-error-after-server-reboot/11717/3)
