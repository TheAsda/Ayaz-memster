FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ./ .
RUN npm run build

ENV NODE_ENV=production

RUN npm ci
RUN npx prisma generate

CMD npm run start