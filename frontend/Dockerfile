# Step 1: Build the frontend
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the frontend
RUN npm run build

# Step 2: Serve the frontend with a lightweight server
FROM nginx:alpine

# Copy the build output to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
