FROM node:13

WORKDIR /WORKDIR

COPY . /WORKDIR/

RUN npm install --production

CMD ["npm", "start"]