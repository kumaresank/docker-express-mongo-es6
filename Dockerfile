FROM mhart/alpine-node:8
MAINTAINER Kumaresan K <tkkumaresan@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 3000
CMD ["npm", "run", "prod"]