FROM node:latest

RUN apt-get update || : && apt-get install python -y

RUN mkdir /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install serverless

CMD ["sls", "deploy"]