#############################################################################################
# Citation: We have learned some knowledge and code from the following aritical             #
#   - 1. https://medium.com/@alinaseri/dockerize-react-applications-with-nginx-17f752deb54  #
#############################################################################################

# The following command will setup the docker

# Run the frontend using node image
FROM node:16-alpine AS react_production     

# Creat webapp directory
WORKDIR /webapp

# Copy all dependencies files
COPY package*.json .

# Install all dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Make a react from development mode to production mode
RUN npm run build

# Run the nginx image so that production build can be served
FROM nginx:stable-alpine3.19-perl

# Copy the static production files made by react to the nginx server
COPY --from=react_production /webapp/build /usr/share/nginx/html
# Setup the configuration file for nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Make sure the port 80 is exposed
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
