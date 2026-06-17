export class User {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
    ){ }

    verificarsenha(digitada: string){
        return digitada === this.senha
    }
}