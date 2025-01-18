FROM node:22-alpine

WORKDIR /src

COPY turbo.json package.json package-lock.json ./

COPY apps ./apps
COPY packages ./packages

RUN npm install

RUN cd packages/db && npx prisma generate && cd ../..

RUN npm run build

CMD ["npm","run","start-user-app"]






