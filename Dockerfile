FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN pwd
RUN npm i
RUN npm run build
CMD npm run start