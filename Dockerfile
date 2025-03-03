# * Linux Alpine image with node 22
FROM node:22.14.0-alpine

# * Our work directory
WORKDIR /app

# * Copy package.json and package-lock.json inside container
COPY package*.json ./

# * Install dependencies
RUN npm install

# * Copy remaining app into container
COPY . .

# * Install Prisma
RUN npm install -g prisma

# * Generate Prisma client
RUN prisma generate

# * Copy Prisma schema
COPY prisma/schema.prisma ./prisma/

# * Open port of container
EXPOSE 3000

# * Run server
CMD ["npm", "start"]