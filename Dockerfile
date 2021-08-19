FROM node:16.5-alpine3.11

ENV NODE_ENV=production

ENV NPM_CONFIG_PRODUCTION=false

COPY ./server/package*.json ./

RUN npm i

COPY ./server .

RUN npm run build

CMD npm run start