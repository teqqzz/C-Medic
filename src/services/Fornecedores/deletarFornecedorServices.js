const { Fornecedor, LoteMaterial, ContaPagar } = require('../../models'); 

const deletarFornecedorServices = async (id) => {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
        return null; 
    }

    const lotesAssociados = await LoteMaterial.count({ where: { fornecedorId: id } });
    if (lotesAssociados > 0) {
        throw new Error(`Não é possível deletar o fornecedor "${fornecedor.nomeFantasia}". Existem ${lotesAssociados} lote(s) de material associado(s) a ele.`);
    }

    const contasPagarAssociadas = await ContaPagar.count({ where: { fornecedorId: id, status: 'Pendente' } }); // Exemplo: verificar pendentes
    if (contasPagarAssociadas > 0) {
        throw new Error(`Não é possível deletar o fornecedor "${fornecedor.nomeFantasia}". Existem ${contasPagarAssociadas} conta(s) a pagar pendente(s) associada(s) a ele.`);
    }


    await fornecedor.destroy();
    return true; 
};

module.exports = deletarFornecedorServices;
