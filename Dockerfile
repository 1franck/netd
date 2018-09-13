FROM node:8

EXPOSE 5000

ADD . /srv/app
WORKDIR /srv/app

RUN npm i -g typescript ts-node tslint mocha nodemon forever --unsafe-perm=true --allow-root

CMD [ "node" ]
