FROM node:16 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm install dompurify

RUN npm run build

EXPOSE 3000

# Start node
CMD ["npm", "start"]