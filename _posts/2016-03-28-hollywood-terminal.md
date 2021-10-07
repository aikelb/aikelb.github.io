---
title: "Hollywood Terminal"
header:
  image: assets/posts/cool-retro-term.jpg
categories: 
  - Software
---
¿Quién no necesita en algún momento de su vida un terminal que parezca que haga cosas importantísimas? ¡Hasta Hollywood lo necesita!

Pues hace ya un tiempo, [Dustin Kirkland](https://github.com/dustinkirkland/hollywood/tree/master/debian) creó una pequeña aplicación que hace eso mismo y tiene esta pinta:

![Hollywood](/assets/img/posts/hollywood.png){: .center-image}

Tiene preparado hasta un repositorio preparado para instalarlo fácilmente Ubuntu:

```shell
sudo apt-add-repository ppa:hollywood/ppa
sudo apt-get update
sudo apt-get install byobu hollywood
```

Y aunque el programa en sí es bastante aparente, si lo combinamos con otros programas podemos conseguir resultados bastante curiosos, y aquí es donde entra cool-retro-term que como su nombre indica, su objetivo es dar un aspecto retro al terminal incluyendo un buen listado de efectos:

![Cool retro term](/assets/img/posts/cool-retro-term.jpg){: .center-image}

Tiene varias skins, y toda la información podemos encontrarla en su Github. El resultado es bastante bueno, probablemente su única pega es la cantidad de dependencias que tiene:

```shell
sudo apt-get install build-essential qmlscene qt5-qmake qt5-default qtdeclarative5-dev qtdeclarative5-controls-plugin qtdeclarative5-qtquick2-plugin libqt5qml-graphicaleffects qtdeclarative5-dialogs-plugin qtdeclarative5-localstorage-plugin qtdeclarative5-window-plugin
```

También es compatible con otras distribuciones de Linux e incluso OSX.
