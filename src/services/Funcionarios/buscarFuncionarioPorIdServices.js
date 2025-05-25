const { Funcionario } = require('../../models');

const buscarFuncionarioPorIdServices = async (id) => {
    const funcionario = await Funcionario.findByPk(id);
    return funcionario;
};

module.exports = buscarFuncionarioPorIdServices;