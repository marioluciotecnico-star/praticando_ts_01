import express, { type Request, type Response } from "express";
import { User } from "./models/user";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const users: User[] = [];

users.push(
  new User(1, "Mario", "mario@gmail.com", "12345"),
  new User(2, "João Silva", "joao@email.com", "123456"),
  new User(3, "Maria Santos", "maria@email.com", "senha123")
);

app.get("/", (request: Request, response: Response) => {
  response.json({
    message: "Bem-vindo à API de usuários!",
    timestamp: new Date().toISOString(),
    status: "API funcionando!",
  });
});


app.get("/users", (request: Request, response: Response) => {
  const dadosPublicos = users.map((user) => user.getDadosPublicos());

  response.json({
    message: `Lista de usuários (${dadosPublicos.length})`,
    users: dadosPublicos,
    timestamp: new Date().toISOString(),
    status: "API funcionando!",
  });
});


app.get("/users/:id", (request: Request, response: Response) => {
  const id = Number(request.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  response.json(user.getDadosPublicos());
});

app.post("/login", (request: Request, response: Response) => {
  const { email, senha } = request.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  if (!user.verificarsenha(senha)) {
    return response.status(401).json({
      message: "Senha incorreta.",
    });
  }

  response.json({
    message: "Login realizado com sucesso!",
    usuario: user.getDadosPublicos(),
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});