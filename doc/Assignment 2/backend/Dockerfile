FROM node:20.16.0-alpine3.20

WORKDIR /webapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

