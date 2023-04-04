const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  }, 
  autora: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('livro', LivroSchema)