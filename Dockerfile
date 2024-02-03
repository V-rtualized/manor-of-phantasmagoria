FROM node:18.18.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY build.js .
COPY tsconfig.json .
COPY .env .
COPY ./src ./src

RUN npm run build

CMD ["npm", "run", "start"]
