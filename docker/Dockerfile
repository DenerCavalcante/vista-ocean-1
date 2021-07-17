FROM node:14

WORKDIR /usr/app

RUN npm update

COPY package*.json ./

RUN npm install

COPY . .

RUN yarn build

CMD  yarn
