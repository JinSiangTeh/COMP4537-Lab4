FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Use the PORT env variable provided by Cloud Run
ENV PORT 3000
CMD [ "node", "server.js" ]
