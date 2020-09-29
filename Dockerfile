FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# https://medium.com/better-programming/docker-in-development-with-nodemon-d500366e74df
#RUN npm install -g nodemon

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
# use this to auto restart node server on code changes in development. also uncomment line 13.
#CMD [ "nodemon", "server.js" ]