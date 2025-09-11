FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your server and website files
COPY server.js ./
COPY website ./public

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]