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
cd algo
pip install -r requirements.txt
python3 script.py
```

### Documentation

For creating your own documentation with python check my code and see how i do my documentation.

#### Powershell

After that run these command :

```sh
pip install sphynx
docker run -it --rm -v ${PWD}/script.py:/docs sphinxdoc/sphinx shpinx-quickstart
```

Response to the question with :
y
the name of your project
your name
your language in the format of two letter like fr,en,es

#### File script.rst

create a file named script.rst :

Here's the content :

```rst
.. _script:

Script Documentation
=====================

.. automodule:: script
   :members:
   :undoc-members:
   :show-inheritance:
```

#### File index.rst

Add below the line `:caption: Contents:` the word script.

#### File config.py

Into the file config.py :

Add the code below on first line of the file :
```py
import os
import sys
sys.path.insert(0, os.path.abspath('../'))
```

Add in the list of the extension you can add manually the string `'sphinx.ext.autodoc'`

#### Powershell

The last thing to do is running this command :

```sh
docker run -it --rm -v ${PWD}:/docs sphinxdoc/sphinx sphinx-build /docs/source /docs/build
```
