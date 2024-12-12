FROM node:16 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install dompurify

COPY . .

RUN npm run build

EXPOSE 3000

# Start node
CMD ["npm", "start"]