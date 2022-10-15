FROM node:16-alpine3.11

WORKDIR /app
CMD ["node", "index.js"]
COPY package.json /app

RUN npm install

COPY . ./