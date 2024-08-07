FROM node:16-alpine AS react_production

WORKDIR /webapp

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.19-perl

COPY --from=react_production /webapp/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
