const { Funcionario } = require('../../models');

const atualizarFuncionarioServices = async (id, dadosAtualizados) => {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {

        return null;
    }
    delete dadosAtualizados.id; 

    await funcionario.update(dadosAtualizados);
    return funcionario; 
};

module.exports = atualizarFuncionarioServices;