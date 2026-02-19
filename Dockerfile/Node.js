# Use a lightweight base image
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# Copying this separately prevents re-installing dependencies on every code change.
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy local code to the container image
COPY . .

# Service must listen to $PORT environment variable.
# Default to 8080 for local testing.
ENV PORT 8080

# Run the web service on container startup
CMD [ "npm", "start" ]
