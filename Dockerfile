FROM node:18.17.1

# Set the working directory in the container
WORKDIR /home/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install pm2 globally in the container
RUN npm install -g pm2

# in order to copy hidden files like .env
COPY . .

EXPOSE 3000 

CMD ["pm2-runtime","/home/app/server.js"]