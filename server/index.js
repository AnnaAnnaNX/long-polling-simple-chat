const express = require('express')
const cors = require('cors')
const events = require('events')
const PORT = 5000
const app = express()
const emitter = new events.EventEmitter()
app.use(cors())
app.use(express.json())
app.post('/new-message', (req, res) => {
    const data = req.body
    emitter.emit('message', data)
    res.status(200)
    res.end()
})
app.get('/message', (req, res) => {
    emitter.once('message', (message) => {
        res.json(message)
    })
})
app.listen(PORT, () => {console.log(`${PORT}`)})