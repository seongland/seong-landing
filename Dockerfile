FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY src ./src/
COPY static ./static/
COPY gatsby-* ./
COPY yarn.lock ./

RUN yarn
RUN yarn gatsby telemetry --disable

EXPOSE 8080

CMD [ "yarn", "start" ]
