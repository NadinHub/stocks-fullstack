
# Stage 1: Build for Development

# 1. Base image with Node.js for building the app
FROM node:21-alpine

# 2. Set working directory, create /app and copy everything into it
WORKDIR /app

# 3. Copy package files and install deps
# It copies everything from local stocks-app/ folder into the container’s /app.
COPY package*.json ./
RUN npm install

# 4. Copy rest of the source code
COPY . .

# 5 . Expose dev port
EXPOSE 3000

# 6. Start the Next.js dev server
CMD ["npm", "run", "dev"] 
