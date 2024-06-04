FROM node

RUN npm install -g nodemon

WORKDIR /app

COPY *.json *.mjs *.js ./

RUN apt-get update && apt-get upgrade && npm i

EXPOSE 3000

CMD [ "npm", "run", "start" ]