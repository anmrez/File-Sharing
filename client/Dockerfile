FROM node:16

WORKDIR /app

COPY . .

RUN npm install ci

RUN npm run build

CMD ["npm", "start"]