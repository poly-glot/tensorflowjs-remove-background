FROM node:12

WORKDIR /var/www/html

COPY package*.json ./
COPY *.js ./

RUN npm install

COPY src/ ./src
COPY public/ ./public

RUN npm run build

CMD [ "npm", "run", "start:serve" ]
