FROM node:20-bookworm
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
expose 4000

CMD ["node", "src/index.js"]
