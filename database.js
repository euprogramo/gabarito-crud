const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
  console.log('Conexão com o banco de dados iniciando')
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Banco de dados conectado com sucesso')
  } catch (err) {
    console.log(err)
  }
}

module.exports = conectaBancoDeDados
