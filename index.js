const express = require('express')

const server = express()

server.use(express.json())

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Ricardo" }

//CRUD - Cread, Read, Update, Delete

const apartamentProject = [
    {
        id: 1,
        title: "Apartamento",
        tasks: "ASsinatura de contrato"
    }
]

server.get('/apartamentProject', (req, res) => {

    return res.json(apartamentProject)
})
server.get('/apartamentProject/:id', (req, res) => {

    const { id } = req.params

    return res.json(
        "Título do projeto: " + apartamentProject[id].title + " => Tarefa: " + apartamentProject[id].tasks
    )
})
server.post('/apartamentProject', (req, res) => {

    const { title, tasks } = req.body

    id = (apartamentProject.length + 1)

    apartamentProject.push({ id, title, tasks })

    return res.json(apartamentProject)

})
server.put('/apartamentProject/:id', (req, res) => {

    const { id } = req.params
    const { title, tasks } = req.body

    apartamentProject[id].id = parseInt(id) + 1
    apartamentProject[id].title = title 
    apartamentProject[id].tasks = tasks

    return res.json(apartamentProject[id]) 
})
server.delete('/userts/:id', (req, res) => {

    const { id } = req.params

    apartamentProject.splice(id, 1)    
    
    return res.send()
})

server.listen(3003) 
