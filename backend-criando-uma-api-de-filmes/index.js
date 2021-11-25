const express = require('express')
const server = express()
const filmes = require('./src/filmes2.json')
const launchURL = 'https://api.spacexdata.com/v3/launches'

server.get('/filmes', (req, res) => {
	return res.json(launchURL)
})

server.listen(3000, () => {
	console.log('Server is running...')
})
