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

# Compile o código TypeScript
RUN npm run build  

# Exponha a porta em que o servidor estará escutando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/src/server.js"]
