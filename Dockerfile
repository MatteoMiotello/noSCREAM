# Use an official Node.js runtime as the base image
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

VOLUME [ "/dist" ]

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the entire project to the working directory
COPY . .

# Define the command to run the app
CMD ["yarn", "build"]