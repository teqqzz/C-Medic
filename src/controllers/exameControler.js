const Exame = require('../models/exameModel');  // Importando o modelo de exame

// Função para listar todos os xames
const listarExames = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao obter xames', erro: err });
  }
};

// Função para criar um novo exame
const criarExame = async (req, res) => {
  try {
    const { descricao, codigo} = req.body;
    const novoExame = new Exame({
      descricao,
      codigo
    });

    const exameSalvo = await novoExame.save();
    res.status(201).json(exameSalvo);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar exame', erro: error.message });
  }
};

// Função para atualizar um paciente
const atualizarExame = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, codigo } = req.body;

    // Atualiza o paciente pelo ID
    const exameAtualizado = await Exame.findOneAndUpdate(
      { id },
      { descricao, codigo },
      { new: true }
    );

    if (!exameAtualizado) {
      return res.status(404).json({ mensagem: 'Exame não encontrado' });
    }

    res.status(200).json(exameAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar exame', erro: error.message });
  }
};

// Função para deletar um exame
const deletarExame = async (req, res) => {
  try {
    const { id } = req.params;

    // Deleta o exame pelo ID
    const exameDeletado = await Exame.findOneAndDelete({ id });

    if (!exameDeletado) {
      return res.status(404).json({ mensagem: 'Exame não encontrado' });
    }

    res.status(200).json({ mensagem: 'Exame deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar Exame', erro: error.message });
  }
};

module.exports = { listarExames, criarExame, atualizarExame, deletarExame };