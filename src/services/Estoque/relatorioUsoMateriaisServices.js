const { MovimentacaoEstoque, Material, Funcionario, sequelize } = require('../../models'); 
const { Op } = require('sequelize');

const relatorioUsoMateriaisServices = async (filtros = {}) => {
    const whereClauseMovimentacao = {
        tipoMovimentacao: {
            [Op.in]: ['Saída por Uso', 'Saída por Venda'] 
        }
    };
    const whereClauseMaterial = {};

    if (filtros.materialId) {
        whereClauseMovimentacao.materialId = filtros.materialId;
    }
    if (filtros.nomeMaterial) {
        whereClauseMaterial.descricao = { [Op.like]: `%${filtros.nomeMaterial}%` };
    }
    if (filtros.tipoMaterial) {
        whereClauseMaterial.tipo = filtros.tipoMaterial;
    }
    if (filtros.dataInicio && filtros.dataFim) {
        whereClauseMovimentacao.dataMovimentacao = {
            [Op.between]: [new Date(filtros.dataInicio), new Date(filtros.dataFim + 'T23:59:59.999Z')]
        };
    }

    const usoMateriais = await MovimentacaoEstoque.findAll({
        attributes: [
            'materialId',
            [sequelize.fn('SUM', sequelize.col('MovimentacaoEstoque.quantidade')), 'totalUsado'],
        ],
        where: whereClauseMovimentacao,
        include: [{
            model: Material,
            attributes: ['descricao', 'tipo', 'unidadeMedida', 'valor'], 
            where: whereClauseMaterial, 
            required: true 
        }],
        group: [
            'MovimentacaoEstoque.materialId',
            'Material.id', 
            'Material.descricao',
            'Material.tipo',
            'Material.unidadeMedida',
            'Material.valor'
        ],
        order: [[sequelize.fn('SUM', sequelize.col('MovimentacaoEstoque.quantidade')), 'DESC']], 
        raw: false, 
    });

  
    return usoMateriais.map(item => {
        const itemJSON = item.toJSON ? item.toJSON() : item; 
        const totalUsado = parseFloat(itemJSON.totalUsado);
        const valorUnitario = itemJSON.Material ? parseFloat(itemJSON.Material.valor) : 0;
        return {
            materialId: itemJSON.materialId,
            descricao: itemJSON.Material ? itemJSON.Material.descricao : 'N/A',
            tipo: itemJSON.Material ? itemJSON.Material.tipo : 'N/A',
            unidadeMedida: itemJSON.Material ? itemJSON.Material.unidadeMedida : 'N/A',
            totalUsado: totalUsado,
            valorUnitario: valorUnitario,
            custoTotalUso: totalUsado * valorUnitario,
        };
    });
};

module.exports = relatorioUsoMateriaisServices;