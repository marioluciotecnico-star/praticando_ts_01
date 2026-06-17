export class User {
  public id: number;
  public nome: string;
  public email: string;
  private senha: string;

  constructor(id: number, nome: string, email: string, senha: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  verificarsenha(senha: string): boolean {
    return this.senha === senha;
  }

  getDadosPublicos() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
    };
  }
}
