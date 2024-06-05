FROM node:20

RUN npm install -g nodemon

WORKDIR /home/node/app

COPY package.json .

RUN npm install

COPY ./ ./ 

EXPOSE 443

CMD ["nodemon", "server.js"]
