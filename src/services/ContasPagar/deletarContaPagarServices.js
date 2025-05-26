const { ContaPagar } = require('../../models');

const deletarContaPagarServices = async (id) => {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
        return null; 
    }

    // Regra de negócio: Não permitir deletar se já foi paga ou parcialmente paga?
    if (conta.status === 'Paga Totalmente' || conta.status === 'Paga Parcialmente') {
        throw new Error(`Não é possível deletar a conta a pagar ID ${id}. Status: ${conta.status}. Considere cancelar a conta se necessário.`);
    }
    // if (conta.valorPago > 0) {
    //     throw new Error(`Não é possível deletar a conta a pagar ID ${id} pois já possui pagamentos registrados. Considere cancelar a conta.`);
    // }

    await conta.destroy();
    return true; // Indica sucesso na deleção
};

module.exports = deletarContaPagarServices;
