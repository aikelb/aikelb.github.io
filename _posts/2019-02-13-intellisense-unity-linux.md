---
title: "Intellisense en Ubuntu con Unity 2018+"
header:
  image: assets/posts/intellisense.jpg
categories: 
  - Guide
---

Mientras utilizaba VSCode con Unity en Ubuntu 18.10 como editor principal, al llegar las últimas actualizaciones dejó de funcionar el autocompletado con un fantástico:

```
The reference assemblies for framework ".NETFramework,Version=v3.5" were not found.
```

Al parecer la última versión no se instala correctamente como dependencia desde VSCode, así que instalar la última versión de .NET o bien vamos a su [web](http://www.mono-project.com/download/stable/) o lo instalamos desde terminal con:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF

echo "deb https://download.mono-project.com/repo/ubuntu stable-bionic main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list

sudo apt update

sudo apt-get install mono-devel
```

[Fuente](https://k00d14.wordpress.com/2018/06/21/got-intellisense-for-unity-and-c-working-on-linux/).
