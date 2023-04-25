import express from "express"
import fs from "fs"
import path from "path"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/create-client-pptp', (request, response) => {
    const { username, password } = request.body
    const fullFilePath = path.join(process.cwd(), '/etc/ppp/')

    if (!username && !password) {
        return response.status(400).send({
            message: 'Nenhum campo pode ser vazio!'
        })
    }

    fs.appendFile(fullFilePath, `${username} pptpd ${password} *\n`, (err) => {
        if (err) throw err
        console.log('Nova linha escrita com sucesso!')
    })

    return response.status(201).send({
        username: username,
        password: password
    })
})

app.listen(3000, () => console.log('App is running...'))