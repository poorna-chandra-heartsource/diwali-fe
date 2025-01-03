# Use the official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Set default environment file
ARG ENV_FILE=.env.development
# Copy the environment file into the build context
COPY ./env/${ENV_FILE} .env

# Build the React app for production
RUN npm run build

# Use a lightweight HTTP server to serve the static files
FROM node:18-alpine

# Set the working directory for the server
WORKDIR /usr/src/app

# Copy the build artifacts from the previous stage
COPY --from=build /app/build ./build

# Install serve to serve the static files
RUN npm install -g serve

# Expose port 3000 (or any port you prefer)
EXPOSE 80

# Start the application using serve
CMD ["serve", "-s", "build", "-l", "80"]
