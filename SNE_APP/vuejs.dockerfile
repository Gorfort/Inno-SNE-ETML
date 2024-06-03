FROM node:16-alpine

RUN npm install -g @vue/cli

WORKDIR /home/vue/app
COPY WebShopFrontEnd/package.json .

RUN npm install
COPY WebShopFrontEnd/ ./ 

EXPOSE 5173
CMD ["npm", "run", "dev", "main.js"]
