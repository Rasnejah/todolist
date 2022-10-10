require('./task/dataBase')
const restify = require('restify')
const cors = require('cors')

const taskController = require('./task/ControllerTasks')


const server = restify.createServer()

server.pre(cors())
server.pre(restify.pre.sanitizePath())
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams:false, allowDots: true }))
server.use(restify.plugins.bodyParser({mapParams: false, allowDots: true}))



server.get('/', (req, res) => {
    res.send("Hello server")
})



server.get('/todo', taskController.getAll)
server.post('/todo',taskController.create)
server.put('/todo/:id', taskController.active)
server.del('/todo/:id',taskController.remove)
server.listen(3002, ()=> console.log("Api Todo iniciada"))