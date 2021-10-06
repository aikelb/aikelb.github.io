---
title: "Ubuntu en un Macbook Pro 6,2"
featured-img: ubuntu1810
categories: 
  - Guide
---

Con la nueva versión de MacOS Mojave, mi MacbookPro de mediadios de 2010 dejará de tener soporte por parte de Apple. Hasta mucho ha tardado la gran manzana en jubilarlo.

No tengo planes de dejar de utilizar el portátil, así que (mientras Nvidia me deje) Linux se encargará de mantenerlo funcionando.

## Distribución de Linux

Hay distribuciones de Linux para aburrir. En [DistroWatch](https://distrowatch.com/?language=ES) mantienen un ranking de popularidad por distribuciones que puede ser una guía más que interesante. En los últimos años las distribuciones basadas en Arch con una instalación guiada (como Manjaro o AntergOS) han subido bastante. Su actualización continua o distribución Rolling Release es estupenda para utilizar siempre la última versión del software, pero puede ser un arma de doble filo en lo que a drivers se refiere. Para mi gusto, la configuración inicial requiere un esfuerzo que no me merece la pena.

Aprovechando las nuevas versiones de [elementary OS 5.0 Juno](https://elementary.io/es/) y [Ubuntu 18.10](https://www.ubuntu.com/), me animé a probar ambas distribuciones en el portátil. elementary OS ha crecido sin parar en los últimos años, pero tuve algunos problemas gráficos al intentar utilizar Unity3D. Finalmente, las [mejoras de rendimiento](https://www.omgubuntu.co.uk/2018/10/ubuntu-18-10-released-review) de Ubuntu 18.10 hacen que sea mi opción preferida por el momento.

![Desktop screenshot][ubuntu]

## Resolución de problemas

No todo fue bonito tras la instalación, así que ahí van los problemas que me encontré durante la instalación.

## Nvidia drivers + EFI boot

Instalar los drivers y reiniciar el equipo daban como resultado un pantallazo negro eterno y costó lo suyo dar con la [solución](https://askubuntu.com/questions/264247/proprietary-nvidia-drivers-with-efi-on-mac-to-prevent-overheating).

Instalamos los drivers propietarios y no reiniciamos.

![Software & Updates](/assets/img/posts/additional-drivers_sm.png)
{: .center-image}

Buscamos los identificadores del bus PCI-E, que serán el primer 'display' y la entrada justo antes. En mi caso, segundo y tercer dispositivos:

```shell
~$ sudo lshw -businfo -class bridge -class display

Bus info          Device      Class       Description
=====================================================
pci@0000:00:00.0   bridge    Core Processor DRAM Controller
pci@0000:00:01.0   bridge    Core Processor PCI Express x16 Root Po
pci@0000:01:00.0   display   GT216M [GeForce GT 330M]
pci@0000:00:02.0   display   Core Processor Integrated Graphics Con
pci@0000:00:1c.0   bridge    5 Series/3400 Series Chipset PCI Expre
pci@0000:00:1c.1   bridge    5 Series/3400 Series Chipset PCI Expre
pci@0000:00:1c.2   bridge    5 Series/3400 Series Chipset PCI Expre
pci@0000:00:1c.3   bridge    5 Series/3400 Series Chipset PCI Expre
pci@0000:00:1e.0   bridge    82801 Mobile PCI Bridge
pci@0000:00:1f.0   bridge    HM55 Chipset LPC Interface Controller
pci@0000:ff:00.0   bridge    Core Processor QuickPath Architecture
pci@0000:ff:00.1   bridge    Core Processor QuickPath Architecture
pci@0000:ff:02.0   bridge    Core Processor QPI Link 0
pci@0000:ff:02.1   bridge    1st Generation Core i3/5/7 Processor Q
pci@0000:ff:02.2   bridge    1st Generation Core i3/5/7 Processor R
pci@0000:ff:02.3   bridge    1st Generation Core i3/5/7 Processor R
```

Creamos el fichero siguiente fichero para forzar el inicio del bus en el arranque EFI:

```shell
~$ sudo nano /etc/grub.d/01_enable_vga.conf

cat << EOF
setpci -s "00:01.0" 3e.b=8
setpci -s "01:00.0" 04.b=7
EOF
```

Cambiamos permisos y actualizamos grub:

```shell
~$ sudo chmod 755 /etc/grub.d/01_enable_vga.conf
~$ sudo update-grub
```

Al reiniciar el equipo el driver de Nvidia debería funcionar correctamente.

## Iluminación del teclado

La solución es plug & play:

```shell
~$ sudo apt install pommed
~$ sudo service pommed start
```

## Ventiladores y control de temperatura

[mbpfan](https://github.com/dgraziotin/mbpfan) lleva bastantes años funcionando. En el mismo repositorio están las instrucciones para su instalación. Esta es la configuración que por ahora me funciona bien:

```shell
~$ sudo vim /etc/mbpfan.conf

[general]
min_fan_speed = 3200
#max_fan_speed = 6200
low_temp = 50
high_temp = 60
max_temp = 86
polling_interval = 5
```

## Soporte 7-zip

Y ya que estamos, podemos añadir soporte para ficheros 7-zip:

```shell
sudo apt-get install p7zip-full
```

[ubuntu]: /assets/img/posts/ubuntu1810_lg.png "Ubuntu 18.10 - MacbookPro 6,2"
