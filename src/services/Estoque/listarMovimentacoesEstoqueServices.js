const { MovimentacaoEstoque, Material, Funcionario } = require('../../models'); // Adicionar Funcionario se associado
const { Op } = require('sequelize');

const listarMovimentacoesEstoqueServices = async (filtros = {}) => {
    const whereClause = {};
    const includeClause = [
        { model: Material, attributes: ['id', 'descricao'] }
    ];

    if (filtros.materialId) {
        whereClause.materialId = filtros.materialId;
    }
    if (filtros.tipoMovimentacao) {
        whereClause.tipoMovimentacao = filtros.tipoMovimentacao;
    }
    if (filtros.funcionarioId) {
        whereClause.funcionarioId = filtros.funcionarioId;
        // Certifique-se de que a associação com Funcionario está em includeClause se não estiver por padrão
        // if (!includeClause.find(inc => inc.model === Funcionario)) {
        //    includeClause.push({ model: Funcionario, attributes: ['id', 'nomeCompleto'] });
        // }
    }
    if (filtros.dataInicio && filtros.dataFim) {
        whereClause.dataMovimentacao = {
            [Op.between]: [new Date(filtros.dataInicio), new Date(filtros.dataFim + 'T23:59:59.999Z')]
        };
    }
    
    return MovimentacaoEstoque.findAll({
        where: whereClause,
        include: includeClause,
        order: [['dataMovimentacao', 'DESC']]
    });
};

module.exports = listarMovimentacoesEstoqueServices;