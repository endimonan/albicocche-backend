# Use uma imagem base do Node.js
FROM node:18.20.2-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Remove dist directory if it exists
RUN rm -rf dist

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port where the server will be listening
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/server.js"]
