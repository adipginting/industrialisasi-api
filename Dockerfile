FROM node:20-bookworm AS BUILD
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nest build




expose 4000



CMD ["node", "src/index.js"]
