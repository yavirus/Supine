FROM node:14.3.0-alpine3.10

WORKDIR /
COPY ./code ./
RUN npm install @braid/vue-formulate
RUN npm install --save axios vue-axios

CMD ["npm", "run", "serve"]


