# backend/Dockerfile
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias (modo producción)
RUN npm install --only=production

# Copiar el código fuente
COPY src ./src

# Variables por defecto
ENV NODE_ENV=production
ENV PORT=4000

# Exponer puerto
EXPOSE 4000

# Comando de arranque
CMD ["node", "src/server.js"]
