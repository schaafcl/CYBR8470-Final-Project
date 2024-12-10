# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install dompurify

# Step 4: Copy the rest of the app's source code into the container
COPY . .

# Step 5: Build the React app for production
RUN npm run build

# Step 6: Serve the app using a simple HTTP server (use `serve` or any static file server)
FROM nginx:alpine

# Copy the build folder from the previous stage to NGINX's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]