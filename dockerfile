FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run client-install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .


EXPOSE 7000
CMD [ "node", "server.js" ]