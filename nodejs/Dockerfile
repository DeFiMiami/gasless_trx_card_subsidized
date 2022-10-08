# syntax=docker/dockerfile:1

FROM node as prod
WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

CMD [ "npm", "start" ]