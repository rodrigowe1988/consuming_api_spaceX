<img src="imagem_inicial_app.png" width="500px">
Tela inicial da Aplicação

## Consumir API

### API

Criar uma API

Abra seu VSCode e crie uma pasta para o seu projeto (utilizei o nome **consuming_spaceX**. Dentro dela inicialize o projeto colocando os seguintes comandos em seu terminal: 

```jsx
npm init -y
```

Instalando as dependências:

```jsx
npm install express nodemon cors axios
```

- **npm** → node package manage
- **install** → para instalar
- **express** → framework Node
- **nodemon** → reiniciar automaticamente o servidor após as atualizações
- **cors** → permitir o acesso do frontend com a API
- **axios** → cliente HTTP baseado em Promises para fazer requisições

Chamando o **express**:

- Crie um arquivo chamado **server.js** dentro da pasta principal do projeto:

```jsx
const express = require('express')
const app = express()

app.get('/', (req, res) => {
	return res.json({ message: 'Olá mundo!'})
})

app.listen('4567')
```

### Frontend

Consumir API

Crie um arquivo **index.html**:

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SpaceX Launches</title>
</head>
<body>
	<script>
		async function getContent(){
			try {
				const response = await fetch('http://localhost:4567')
				console.log('testando o servidor)
			} catch (error) {
				console.error(error)
			}
		}
		getContent()
	</script>
</body>
</html>
```

Perceba que eu criei uma função **assíncrona** que esperará até receber a API e salvará o conteúdo dentro de **response**.

Perceba também o **console.log('testando o servidor')** que coloquei para usar o **npx lite-server**. Esse comando quando digitado no terminal permite à aplicação atualizar automaticamente a cada alteração feita em seu arquivo html.

Para permitir que nossa aplicação acesse o backend e use nossa API iremos utilizar o **CORS**. Para isso no arquivo **server.js** adicionamos o **CORS** para permitir o acesso à API:

```jsx
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
	return res.json([
		{ name: 'Rodrigo'},
		{ name: 'Rogério'},
	])
})

app.listen('4567')
```

Perceba que fiz uma alteração no arquivo **server.js** e adicionei objetos com a propriedade **name**. 

Voltando ao arquivo html, vamos utilizar a resposta da nossa **API** e trabalhar com ela.

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SpaceX Launches</title>
</head>
<body>
	<ul id="lista"></ul>
	<script>
		async function getContent(){
			try {
				const response = await fetch('http://localhost:4567/')
				const data = await response.json()
				console.log()
				show(data)
			} catch (error) {
				console.log(error)
			}
		}
		getContent()

		function show(users) {
			let output = ''

			for( let user of users ) {
				output += `<li>${user.name}</li>`
			}

			document.getElementById('lista').innerHTML = output
		}

	</script>
</body>
</html>
```

### Backend
Pegando a URL com os dados de lançamentos: 
* https://api.spacexdata.com/v3/launches

AXIOS
Muito parecido com a ideia do fetch, utilizaremos o axios para receber o json da API de lançamentos.

```
const cors = require('cors')
const express = require('express')
const app = express()
const axios = require('axios')

app.use(cors())

app.get('/', async(req, res) => {

	//do response (res) podemos extrair diretamente o data
	const { data } = await axios('https://api.spacexdata.com/v5/launches')

	return res.json(data)
})

app.listen('4567')
```
Ao executar o código acima (node server.js), podemos ver que na porta localhost:4567 temos nossa API rodando perfeitamente.
