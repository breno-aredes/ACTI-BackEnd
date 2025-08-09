# ACTi Backend API

API RESTful para o projeto ACTi - Cadastro de Parceiros Comerciais, construída com Node.js, Express e TypeScript.

## Estrutura do Projeto

```
ACTI-BackEnd/
├── src/
│   ├── config/         # Configurações (banco de dados)
│   ├── controllers/    # Controladores das rotas
│   ├── routes/         # Definição das rotas
│   ├── services/       # Lógica de negócio e conexão com banco
│   ├── types/          # Definições de tipos TypeScript
│   ├── app.ts          # Configuração principal da aplicação
│   └── server.ts       # Ponto de entrada do servidor
├── dist/               # Código JavaScript compilado
├── package.json
├── tsconfig.json       # Configuração TypeScript
├── .env                # Variáveis de ambiente
└── README.md
```

## Banco de Dados

O projeto utiliza **SQL Server 2022** configurado no WSL Ubuntu.

- **Servidor**: localhost:1433
- **Banco**: ACTI
- **Tabela**: Partners
- **Procedure**: sp_insert_partner

> ⚠️ **Importante**: Certifique-se de que o SQL Server esteja em execução no seu ambiente (WSL, Ubuntu ou Windows) antes de iniciar a API.

### Verificar Status do SQL Server

```bash
sudo systemctl status mssql-server
```

## Instalação e Configuração

### 1. Pré-requisitos

- Node.js 18+
- SQL Server 2022 instalado no seu ambiente
- Banco de dados ACTI configurado (veja [`/ACTI-Banco/README.md`](https://github.com/breno-aredes/ACTI-Banco/blob/main/README.md))

### 2. Instalação

```bash
# Clone o repositório
git clone git@github.com:breno-aredes/ACTI-BackEnd.git
cd ACTI-BackEnd

# Instale as dependências
npm install
```

### 3. Configuração do Banco

Certifique-se de que o arquivo `.env` esteja configurado corretamente:

```env
PORT=3000
NODE_ENV=development
HOST=localhost

# Configurações do SQL Server
DB_SERVER=localhost
DB_NAME=ACTI
DB_USER=sa
DB_PASSWORD=SuaSenhaAqui
```

### 4. Execute a Aplicação

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📡 Endpoints Disponíveis

### Health Check

- **GET** `/health` - Verifica o status da aplicação

### Parceiros

- **POST** `/partners` - Cadastra um novo parceiro comercial

### Exemplo de requisição POST /partners:

```json
{
  "PartnerType": "Cliente",
  "PersonalityType": "Jurídica",
  "CompanyName": "Empresa Exemplo LTDA",
  "TradeName": "Empresa Exemplo",
  "CnpjCpf": "12.345.678/0001-90",
  "Segment": "Tecnologia",
  "Category": "Prestação de Serviços",
  "ZipCode": "12345-678",
  "Country": "Brasil",
  "State": "SP",
  "City": "São Paulo",
  "Street": "Rua Exemplo",
  "Number": "123",
  "District": "Centro",
  "Email": "contato@empresa.com",
  "Phone": "(11) 1234-5678",
  "AddressComplement": "Sala 10",
  "MobilePhone": "(11) 98765-4321",
  "Notes": "Cliente em potencial"
}
```

## Scripts Disponíveis

- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia o servidor (produção)
- `npm run dev` - Inicia com auto-reload (desenvolvimento)

## Dependências

### Produção

- **express** - Framework web
- **cors** - CORS middleware
- **dotenv** - Gerenciamento de variáveis de ambiente
- **mssql** - Driver SQL Server para Node.js
- **joi** - Validação de esquemas

### Desenvolvimento

- **typescript** - Compilador TypeScript
- **@types/node** - Tipos TypeScript para Node.js
- **@types/express** - Tipos TypeScript para Express
- **@types/cors** - Tipos TypeScript para CORS
- **@types/mssql** - Tipos TypeScript para MSSQL
- **ts-node** - Execução TypeScript direta
- **nodemon** - Auto-reload durante desenvolvimento

## Processo Seletivo ACTi

Este projeto faz parte do teste técnico para desenvolvedor Jr WEB da ACTi, implementando:

✅ **Backend completo** com rota POST /partners  
✅ **Conexão com SQL Server** via stored procedure  
✅ **Validações de duplicidade** (CNPJ/CPF)  
✅ **Tratamento de erros** robusto  
✅ **Estrutura organizada** seguindo boas práticas  
✅ **TypeScript** para tipagem estática

---

**Desenvolvido por:** Breno Arêdes  
**Tecnologias:** Node.js, TypeScript, Express, SQL Server 2022, WSL Ubuntu
