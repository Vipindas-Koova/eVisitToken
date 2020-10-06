FROM node:latest

RUN mkdir /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g serverless

ENTRYPOINT [ "/bin/bash" ]

