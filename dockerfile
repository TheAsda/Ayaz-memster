FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ./ .
RUN npm run build

ENV NODE_ENV=production

RUN npx prisma generate
RUN npm prune --production && npm cache clean --force && command rm -rf .git

CMD npm run start:test