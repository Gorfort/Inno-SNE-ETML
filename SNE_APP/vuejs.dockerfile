FROM node:16-alpine

RUN npm install -g @vue/cli

WORKDIR /home/vue/app
COPY SNE_FRONT/package.json .

RUN npm install
COPY SNE_FRONT/ ./ 

EXPOSE 5173
CMD ["npm", "run", "dev", "main.js"]
