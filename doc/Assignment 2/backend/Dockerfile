
# Use node image to run the backend
FROM node:20.16.0-alpine3.20

# Creat webapp directory
WORKDIR /webapp

# Copy all dependencies files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Make sure the port 3000 is exposed
EXPOSE 3000

CMD ["npm", "start"]

