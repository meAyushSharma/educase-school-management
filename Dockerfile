# minimal base image
FROM node:20-alpine3.17
# starting directory of application
WORKDIR /usr/src/app
# to use layer caching optimally
COPY package*.json ./
# to install dependencies without updating
RUN npm ci
COPY . .
# generate prisma client
RUN npx prisma generate
# start the server, as it would automatically build /dist
CMD ["npm", "run", "start"]