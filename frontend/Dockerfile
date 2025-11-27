# frontend/Dockerfile
FROM nginx:alpine

# Elimina la página por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todo el frontend al directorio público de Nginx
COPY . /usr/share/nginx/html

# Nginx escucha en el puerto 80 dentro del contenedor
EXPOSE 80
