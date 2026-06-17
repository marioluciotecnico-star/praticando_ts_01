
import express, { type Request, type Response } from 'express'
import { User } from './models/user'

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request: Request, response: Response) => {

    response.json({
        message: 'Bem-vindo à API de usuários!',
        timestamp: new Date().toISOString(),
        status: 'API funcionando!'
    })

})

app.get('/users', (request: Request, response: Response) => {

    const user = new User('mario', 'mario@gmail.com','12345')

    console.log(user.verificarsenha('12345'))

    response.json({
        message: `Dados Usuario: ${user.nome}`,
        timestamp: new Date().toISOString(),
        user: user,
        status: 'API funcionando!'
    })

})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Health: http://localhost:${port}/health`)
})