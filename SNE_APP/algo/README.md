# Inno-SNE-ETML : ETML Social Network
 ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)  ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Description

Project not yet finished.

## Images

Project not yet finished.

## How to use the project

Project not yet finished.

## How to build the project

### Installing the environment for python

To build and execute the python do this command :

But before try to do this command you have to install docker, git and python :

#### Docker

* Go to the this [url](https://www.docker.com/products/docker-desktop/)
* Click on the button Download for windows
* When the download is finish close your navigator
* Go to your downloads and double click on the .exe
* Say Yes to the admin window
* Follow what say the installer choose the default option.
* When you have the button Close and restart click it. It's the end of the first installer.
* When your computer is restarted, open again docker another window will appear and follow it.

#### Python

* Go to the Microsoft Store
* In the search bar type Python 3.12
* Click on the first result
* Click on the download button

#### Git

* For installing git go to this [url](https://git-scm.com/)
* Click on the button in the screen
* Follow the installer

#### Installation of the package

```sh
git clone https://github.com/Gorfort/Inno-SNE-ETML.git
cd Inno-SNE-ETML
git checkout QMZ_Py
cd SNE_APP
cd algopip
python -m venv .venv
./.venv/Scripts/Activate.ps1
pip install -r requirements.txt
python3 script.py
```

#### When you have finished your work launch this command :

```sh
deactivate
```

#### Issue n°1

if this command failed `./.venv/Scripts/Activate.ps1` :

Here's is some solution :

* If powershell isn't installed in your system. Installe it at this [url](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)
* You can change your ExecutionPolicy to RemoteSigned with this command `Set-ExecutionPolicy RemoteSigned` in a terminal admin
* If it's not working try this command instead `./.venv/Scripts/activate.bat`
