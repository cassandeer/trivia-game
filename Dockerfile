FROM node:14-alpine

WORKDIR /app

COPY ./package.json /app/package.json

RUN npm cache clean --force
RUN npm install

# COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]