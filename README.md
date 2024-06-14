# ⚙️ Inno-SNE-ETML : ETML Social Network
 ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)  ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Description 
Project not yet finished.

## Images
Project not yet finished.

## How to use the project
Project not yet finished.

## How to build the project

### Installing the environment for python in Ubuntu

To build and execute the python do this command :

But before try to do this command you have to install git and python :

#### Python :

Execute this command to install Python :

```sh
sudo apt update
sudo apt upgrade
sudo apt install python3 -y
sudo apt install python3-pip -y
python --version
```

#### Git :

Execute this command to install Git :

```sh
sudo apt update
sudo apt upgrade
sudo apt install git -y
git --version
```

#### Docker :

Execute this command to install Docker :

```sh
sudo apt update
sudo apt upgrade
sudo apt snap docker
sudo apt install docker-compose -y
``` 

#### Build the project

```sh
git clone https://github.com/Gorfort/Inno-SNE-ETML.git
cd Inno-SNE-ETML
git checkout QMZ_Algo-IA
cd SNE_APP/algo
docker-compose up -d --build
pip install -r requirements.txt
```

#### Chargé le dump dans la base de données

```sh
open http://localhost:8081
```

Dans l'onglet Importer, appuyez sur le bouton Parcourir et mettez le dump dans le dossier racine db

#### Préparer le Node.js

Aller au dossier depuis la racine ./SNE_APP/app
Ouvrir le fichier server.js. Enlever un point-virgule et remttez le.

#### Lancer le script

```sh
python3 ../algo/script.py
```

C'est bon tout est fini

#### Erreur n°1

Si l'erreur intervient sur le docker-compsoe voici quelque commande pour essaer de le reglé

```sh
sudo usermod -aG docker $USER
newgrp docker
```

```sh
sudo ls -l /var/run/docker.sock

sudo chown root:docker /var/run/docker.sock
sudo chmod 660 /var/run/docker.sock
```

Et ensuite redémmarer docker

```sh
sudo systemctl restart docker
```

### Installing the environment for python in Windows

To build and execute the python do this command :

But before try to do this command you have to install git and python :

#### Python

* For installing python go to this [url](https://www.python.org/downloads/).
* Download the correct installer.
* Follow the installer.

#### Git

* For installing git go to this [url](https://git-scm.com/)
* Click on the button in the screen
* Follow the installer

#### Installation of the package

```sh
python --version
git clone https://github.com/Gorfort/Inno-SNE-ETML.git
cd Inno-SNE-ETML
git checkout QMZ_IA
cd algo
pip install -r requirements.txt --user -U
```

#### Setup the environment

```sh
python3 -m venv .venv
source .venv/Scripts/activate
```

When you have finished your work launch this command :

```sh
deactivate
```

#### Launch the script

```sh
python3 script.py
```
