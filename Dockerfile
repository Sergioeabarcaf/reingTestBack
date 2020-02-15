FROM node:12.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8000
CMD [ "npm", "start" ]