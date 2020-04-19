const express = require('express')

const server = express()

server.use(express.json())

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Ricardo" }

//CRUD - Cread, Read, Update, Delete

/**
 * A variável `apartamentProjects` pode ser `const` porque um `array`
 * pode receber adições ou exclusões mesmo sendo uma constante.
 */

const apartamentProjects = []

/**
 * Middleware que checa se o projeto existe
 */
function checkProjectExists(req, res, next) {

    const { id } = req.params
    const apartamentProject = apartamentProjects.find(p => p.id == (id + 1)) 

    if (!apartamentProject) {
        return res.status(400).json({ error: 'Project not found'})
    }

    return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {

    console.count("Número de requisições");
  
    return next();
  }
  
server.use(logRequests);

server.get('/apartamentProjects', (req, res) => {

    return res.json(apartamentProjects)
})
server.get('/apartamentProjects/:id', (req, res) => {

    const { id } = req.params

    return res.json(apartamentProjects[id])
})
server.post('/apartamentProjects', (req, res) => {

    const { title, tasks } = req.body

    id = (apartamentProjects.length + 1)

    apartamentProjects.push({ id, title, tasks })

    return res.json(apartamentProjects)

})
server.put('/apartamentProjects/:id', checkProjectExists, (req, res) => {

    const { id } = req.params
    const { title, tasks } = req.body

    apartamentProjects[id].id = parseInt(id) + 1
    apartamentProjects[id].title = title 
    apartamentProjects[id].tasks = tasks

    return res.json(apartamentProjects[id]) 
})
server.delete('/apartamentProjects/:id', checkProjectExists, (req, res) => {

    const { id } = req.params

    const apartamentProjectsIndex = apartamentProjects.findIndex(p => p.id == id)

    apartamentProjects.splice(apartamentProjectsIndex, 1)    
    
    return res.json({ delete: `Successfully removed ${id}` })
})

server.listen(3003) 
