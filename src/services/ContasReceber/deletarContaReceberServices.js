const { ContaReceber } = require('../../models');

const deletarContaReceberServices = async (id) => {
    const conta = await ContaReceber.findByPk(id);
    if (!conta) {
        return null; 
    }

    if (conta.valorRecebido > 0 && conta.status !== 'Cancelada') {
        throw new Error(`Não é possível deletar a conta a receber ID ${id} pois já possui pagamentos registrados e não está cancelada. Considere cancelar a conta primeiro.`);
    }



    await conta.destroy();
    return true; 
};

module.exports = deletarContaReceberServices;
