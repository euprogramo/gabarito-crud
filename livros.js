const express = require('express')
const conectaBancoDeDados = require('./database')
const cors = require('cors')
const router = express.Router()
const app = express()
const Livro = require('./ModelLivro')

conectaBancoDeDados()
app.use(cors())
app.use(express.json())

const PORTA = 3333

//GET
async function mostraLivros(request, response) {
  try {
    const livrosVindosDoBancoDeDados = await Livro.find()
    response.status(200).json(livrosVindosDoBancoDeDados)
  } catch(err) {
    console.log(err)
  }
}

//POST
async function criaLivro(request, response) {
  const novoLivro = new Livro({
    nome: request.body.nome,
    autora: request.body.autora,
    categoria: request.body.categoria,
  })

  try { 
    const livroCriado = await novoLivro.save()
    response.status(201).json(livroCriado)
  } catch (err) {
    console.log(err)
  }
}

//PATCH
async function corrigeLivro(request, response) {
  try {
    const livroEncontrado = await Livro.findById({_id: request.params.id})

    if (request.body.nome) {
      livroEncontrado.nome = request.body.nome
    }

    if (request.body.autora) {
      livroEncontrado.autora = request.body.autora
    }

    if (request.body.categoria) {
      livroEncontrado.categoria = request.body.categoria
    }

    const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()
    response.json(livroAtualizadoNoBancoDeDados)
  } catch (err) {
    console.log(err)
  }
}

//DELETE
async function deletaLivro(request, response) {
  try{ 
    await Livro.findByIdAndDelete(request.params.id)   

    response.json({ message: 'Livro deletado com sucesso!'})
  } catch (err) {
    console.log(err)
  }
}

//rotas
app.use(router.get('/livros', mostraLivros))
app.use(router.post('/livros', criaLivro))
app.use(router.patch('/livros/:id', corrigeLivro))
app.use(router.delete('/livros/:id', deletaLivro))

function mostraPorta() {
  console.log(`Servidor criado e rodando na porta ${PORTA}`)
}

app.listen(PORTA, mostraPorta)
