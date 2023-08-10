# Use the official Node.js 14 image as the base image
FROM node:lts-alpine

# Create an application directory
RUN mkdir -p /app

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the contents of the src directory to the container
COPY src/ ./

# Expose port 8000 (assuming your Node.js app listens on this port)
EXPOSE 8000

# Command to start the server
CMD ["node", "server.js"]
