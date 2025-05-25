const { Funcionario } = require('../../models');

const criarFuncionarioServices = async (dadosFuncionario) => {
    return Funcionario.create(dadosFuncionario);
};

module.exports = criarFuncionarioServices;