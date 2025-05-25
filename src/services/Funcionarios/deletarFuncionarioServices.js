const { Funcionario } = require('../../models');

const deletarFuncionarioServices = async (id) => {
    const funcionario = await Funcionario.findByPk(id);
    if (!funcionario) {
        return null; 
    }

    await funcionario.destroy();
    return true; 
};

module.exports = deletarFuncionarioServices;