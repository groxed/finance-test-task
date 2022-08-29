'use strict'
const express = require('express')
const http = require('http')
const io = require('socket.io')
const cors = require('cors')

const { trackTickers } = require('./trackTickers')

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
const server = http.createServer(app)

const socketServer = io(server, {
    cors: {
        origin: '*',
    },
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

socketServer.on('connection', function (socket) {
    socket.on('start', (fetchInterval, tickers) => {
        trackTickers(socket, fetchInterval, tickers)
    })
})

server.listen(PORT, () => {
    console.log(`Streaming service is running on http://localhost:${PORT}`)
})
