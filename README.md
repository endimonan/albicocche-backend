# Albicocche Backend

## Descrição

O backend do projeto Albicocche (Aposta Saudável) é uma API RESTful desenvolvida com Node.js, Express e MongoDB. Ele fornece todas as funcionalidades necessárias para gerenciar usuários, registros de atividades diárias e apostas entre amigos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side
- **Express**: Framework web para Node.js
- **TypeScript**: Superset de JavaScript com tipagem estática
- **MongoDB/Mongoose**: Banco de dados NoSQL e ODM (Object Document Mapper)
- **JWT**: JSON Web Tokens para autenticação
- **Bcrypt**: Para criptografia de senhas
- **Nodemailer**: Para envio de emails
- **AWS S3**: Para armazenamento de imagens (avatares)
- **Docker**: Para containerização da aplicação

## Estrutura de Diretórios

```
src/
├── config/         # Configurações do aplicativo (cors, db, etc.)
├── controllers/    # Controladores que lidam com as requisições
├── dtos/           # Data Transfer Objects para validação
├── middlewares/    # Middleware para autenticação e outros
├── models/         # Modelos do Mongoose
├── routes/         # Rotas da API
│   ├── protected/  # Rotas que requerem autenticação
│   └── public/     # Rotas públicas
├── services/       # Serviços de negócios
├── utils/          # Utilitários e helpers
├── validations/    # Funções de validação
├── app.ts          # Configuração do Express
└── server.ts       # Ponto de entrada da aplicação
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (v14+)
- MongoDB
- Conta AWS (opcional, para armazenamento de avatares)

### Passos para instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/albicocche.git
   cd albicocche/albicocche-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações.

4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

### Usando Docker

Alternativamente, você pode usar Docker para executar a aplicação:

```bash
docker-compose up
```

## API Endpoints

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh-token` - Atualizar token de acesso

### Usuários

- `POST /api/user/register` - Registrar novo usuário
- `GET /api/user/verify/:code` - Verificar email do usuário
- `POST /api/user/forgot-password` - Solicitar recuperação de senha
- `POST /api/user/reset-password` - Redefinir senha

### Usuários (Protegido)

- `GET /api/user/profile` - Obter perfil do usuário
- `PUT /api/user/profile` - Atualizar perfil do usuário
- `POST /api/user/change-email` - Iniciar processo de alteração de email
- `POST /api/user/confirm-email` - Confirmar novo email
- `POST /api/user/change-password` - Alterar senha

### Registros (Protegido)

- `POST /api/records` - Criar novo registro de atividade
- `GET /api/records` - Listar registros do usuário
- `GET /api/records/:id` - Obter detalhes de um registro
- `PUT /api/records/:id` - Atualizar um registro
- `DELETE /api/records/:id` - Excluir um registro

### Apostas (Protegido)

- `POST /api/bet/create` - Criar nova aposta
- `GET /api/bet/active` - Listar apostas ativas
- `GET /api/bet/:id` - Obter detalhes de uma aposta
- `PUT /api/bet/:id` - Atualizar uma aposta (apenas admin)

## Segurança

- Autenticação baseada em JWT
- Senhas criptografadas com bcrypt
- Proteção contra ataques de força bruta (rate limiting)
- Verificação de email para novos usuários

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit de suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a MIT License. 