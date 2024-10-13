# API de Gerenciamento de Tarefas

## Visão Geral
Esta API permite gerenciar usuários, tarefas e tags, com funcionalidades como criação, atualização, deleção e listagem de tarefas. A API inclui autenticação de usuário e controle de permissões para garantir que as operações sejam realizadas de forma segura.


## Funcionalidades Principais

- **Tarefas (CRUD Completo)**:
  - Criar, ler, atualizar e excluir tarefas com prioridades, status e tags.

- **Tags (CRUD Completo)**:
  - Gerenciar tags reutilizáveis entre tarefas.

- **Autenticação e Autorização**:
  - Registro e login de usuários com proteção JWT.

- **Controle de Permissões**:
  - Apenas o criador pode editar ou excluir suas tarefas e tags.

## Tecnologias Utilizadas
- **Node.js com Express.js**
- **MongoDB com Mongoose**
- **TypeScript**
- **JWT (JSON Web Token) para autenticação**
- **Dotenv** (para variáveis de ambiente)


## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/Karolayne-silva/lista-de-tarefas-api.git
    ```

2. Acesse o diretório do projeto:
    ```bash
    cd lista-de-tarefas-api
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Crie um arquivo `.env` com as seguintes variáveis:
    ```plaintext
    JWT_SECRET=your_secret_key
    MONGODB_URL=linkdomongodbatlas
    ```

5. Inicie o servidor:
    ```bash
    npm run start:dev
    ```

6. Acesse a aplicação em `http://localhost:3000`.

## Rotas da API

### Autenticação de Usuário

#### **Registro de Usuário**

- **POST** `/user/register`
- Cria um novo usuário.
- **Corpo da Requisição**:
  
  ```json
  {
    "email": "usuario@example.com",
    "password": "senha"
  }
  ```

- **Resposta de Sucesso:**
   ```json
  {
    "message": "Usuário criado com sucesso!"
  }
  ```

#### **Login de usuário**

- **POST** `/login`
- Autentica o usuário e retorna um token JWT.
- **Corpo da Requisição**:
  
  ```json
  {
  "user": {
    "_id": "usuarioId",
    "email": "usuario@example.com"
  },
  "token": "jwt_token_aqui"
  }
  ```

### Usuário

#### **Listar usuários**
- **GET** `/users`
- Recupera todos os usuários.
- **Resposta de sucesso**
  ```json
  {
  "message": "Usuários recuperados com sucesso!",
  "Users": [
    {
      "_id": "6707e83ca4e5ac14b46fbb7f",
      "email": "email@gmail.com",
      "password": "senha",
      "tasks": ["tadkId"],
    }
  ]
  }
  ```
 #### **Listar usuários por Id**
 - **GET** `/users/:id`
- Recupera o usuário do id especificado.
- **Resposta de sucesso:**
  ```json
   {
    "message": "Usuário recuperado com sucesso!",
    "Users": [
      {
        "_id": "6707e83ca4e5ac14b46fbb7f",
        "email": "email@gmail.com",
        "password": "senha",
        "tasks": ["tadkId"],
      }
    ]
    }
  ```

#### **Atualizar usuário**
- **PUTCH** `/users/:id`
- Atualiza um usuário especifico.
- **Corpo da requisição**
  
  ```json
    {
      password: "senha2"
    }
  ```
  
- **Resposta de sucesso:**
  ```json
   {
    "message": "Usuário atualizado com sucesso!",
    "Users": [
      {
        "_id": "6707e83ca4e5ac14b46fbb7f",
        "email": "email@gmail.com",
        "password": "senha2",
        "tasks": ["tadkId"],
      }
    ]
    }
  ```

#### **Excluir usuário**
- **DELETE** `/users/:id`
- Exclui um usuário especifico.
- **Resposta de sucesso:**
  ```json
  {
    "message": "Usuário deletado com sucesso!"
  }
  ```

### Tarefas

#### **Registro de Tarefas**

- **POST** `/tasks/create`
- Cria uma nova tarefa.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Corpo da Requisição**:
  
  ```json
  {
  "title": "Título da tarefa",
  "description": "Descrição da tarefa",
  "priority": "alta",
  "status": "Em andamento"
  "tags": [
    { "name": "Trabalho", "color": "#FF5733" }
  ]
  }
  ```
- **Resposta de sucesso**:
  ```json
  {
  "message": "Tarefa criada com sucesso!",
  "task": {
    "_id": "tarefaId",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "priority": 4,
    "tags": [ "tagId" ]
  }
  }
  ```


#### **Listar tarefas**

- **GET** `/tasks`
- Recupera todas as tarefas associadas ao usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Resposta de sucesso**:
  ```json
  {
  "message": "Tarefas recuperadas com sucesso!",
  "task": {
    "_id": "tarefaId",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "priority": 4,
    "tags": [ "tagId" ]
  }
  }
  ```
#### **Listar tarefa especifica(id)**
- **GET** `/tasks/:id`
- Recupera a tarefa especifica associada ao usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tarefa recuperada com sucesso!",
    "task": {
      "_id": "tarefaId",
      "title": "Novo título da tarefa",
      "description": "Nova descrição da tarefa",
      "priority": 3,
      "tags": [ "tagId" ]
    }
  }
  ```

  

#### **Atualizar tarefa**

- **PATCH** `/tasks/:id`
- Atualiza uma tarefa específica do usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Corpo da requisição**:
  ```json
    {
      "title": "Novo título da tarefa",
      "description": "Nova descrição da tarefa",
      "priority": 3
    }
  ```
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tarefas recuperadas com sucesso!",
    "task": {
      "_id": "tarefaId",
      "title": "Novo título da tarefa",
      "description": "Nova descrição da tarefa",
      "priority": 3,
      "tags": [ "tagId" ]
    }
  }
  ```

#### **Excluir tarefa**
- **DELETE** `/tasks/:id`
- exclui uma tarefa específica do usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ``` 
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tarefa deletada com sucesso!" 
  }
  ```
#### **Listar tarefas por tag**
- **POST** `/tasks/bytags`
- Recupera todas as tarefas que possuem a tag especificada.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Corpo da requisição**:
  ```json
    
  {
    "tags": [{
        "name": "casa"
    }, {
        "name": "cozinha"
    }]
  }
    
  ```
- **Resposta de sucesso**:
 ```json
  {
    "message": "Tarefas encontradas com sucesso!",
    "task": {
      "_id": "tarefaId",
      "title": "Novo título da tarefa",
      "description": "Nova descrição da tarefa",
      "priority": 3,
      "tags": [ {
        "id": "taskId",
        "name": "casa"
      },
      {
        "id": "taskId",
        "name": "cozinha"
      }]
    }
  }
  ```

### Tags

#### **Registro de Tags**

- **POST** `/tags/create`
- Cria uma nova tag.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Corpo da Requisição**:
  
  ```json
  {
    "name": "casa",
    "color: "vermelho"
  }
  ```
- **Resposta de sucesso**:
  ```json
  {
  "message": "Tag criada com sucesso!",
  "tag": {
    "_id": "tarefaId",
    "name": "casa",
    "color": "vermelho"
  }
  }
  ```
  
#### **Listar tags**

- **GET** `/tags`
- Recupera todas as tags associadas ao usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Resposta de sucesso**:
  ```json
  {
  "message": "Tags recuperadas com sucesso!",
  "tag": {
    "_id": "tarefaId",
    "name": "casa",
    "color": "vermelho"
  }
  }
  ```

#### **Listar tag especifica(id)**
- **GET** `/tags/:id`
- Recupera a tag especifica associada ao usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tag recuperada com sucesso!",
    "tag": {
    "_id": "tarefaId",
    "name": "casa",
    "color": "vermelho"
  }
  }
  ```

#### **Atualizar tag**

- **PATCH** `/tags/:id`
- Atualiza uma tag específica do usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ```
- **Corpo da requisição**:
  ```json
    {
      "color": "verde",
    }
  ```
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tag recuperada com sucesso!",
    "tag": {
      "_id": "tarefaId",
      "name": "casa",
      "color": "verde"
  }
  }
  ```

#### **Excluir tag**
- **DELETE** `/tags/:id`
- exclui uma tag específica do usuário autenticado.
- **Requer autenticação:** Sim.
- **Cabeçalho:**
  ```plaintext
    Authorization: Bearer {token}
  ``` 
- **Resposta de sucesso**:
  ```json
  {
    "message": "Tag deletada com sucesso!" 
  }
  ```

## Autenticação
A autenticação é baseada em JWT. Para acessar as rotas protegidas, o usuário precisa fornecer o token no cabeçalho da requisição:
```plaintext
  Authorization: Bearer {token}
```

