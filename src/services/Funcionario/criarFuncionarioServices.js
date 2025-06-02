const { Funcionario } = require('../../models'); 
const { Op } = require('sequelize');

async function criarFuncionarioServices(dadosFuncionario) {
  try {
    const existente = await Funcionario.findOne({
      where: {
        [Op.or]: [
          { cpf: dadosFuncionario.cpf },
          { email: dadosFuncionario.email }
        ]
      }
    });

    if (existente) {
      if (existente.cpf === dadosFuncionario.cpf) {
        throw new Error(`CPF ${dadosFuncionario.cpf} já cadastrado.`);
      }
      if (existente.email === dadosFuncionario.email) {
        throw new Error(`Email ${dadosFuncionario.email} já cadastrado.`);
      }
    }

    const novoFuncionario = await Funcionario.create(dadosFuncionario);
    return novoFuncionario;
  } catch (error) {
    console.error("Erro ao criar funcionário no serviço:", error.message);
    throw error;
  }
}

module.exports = criarFuncionarioServices;
