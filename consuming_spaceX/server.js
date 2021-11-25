const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/', async(req, res) => {

	//do response (res) podemos extrair diretamente o data
	const { data } = await axios('https://api.spacexdata.com/v5/launches')

	console.log('server is runnig...')
	return res.json(data)
})

app.listen('4567')
