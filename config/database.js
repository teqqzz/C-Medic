require('dotenv').config();
const mongoose = require('mongoose');

// Use o URL de conexão fornecido pelo MongoDB Atlas
const mongoURL = process.env.MONGO_URL || 'mongodb+srv://teste:teste@cluster0.mrin7sc.mongodb.net/';

// Conectar ao MongoDB Atlas
mongoose.connect(mongoURL)
  .then(() => console.log('Conectado ao MongoDB Atlas!'))
  .catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

module.exports = mongoose;