# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the custom Nginx configuration to support React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React app to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 8080 as expected by Cloud Run
EXPOSE 8080
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
