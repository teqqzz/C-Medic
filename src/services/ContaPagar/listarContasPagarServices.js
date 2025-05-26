const { ContaPagar, Fornecedor, CategoriaDespesa, Funcionario } = require('../../models');
const { Op } = require('sequelize');
const { parseISO, startOfDay, endOfDay } = require('date-fns');

async function listarContasPagarServices({
  descricao,
  fornecedorId,
  categoriaDespesaId,
  status,
  dataVencimentoInicio,
  dataVencimentoFim,
  dataPagamentoInicio,
  dataPagamentoFim,
  incluirDetalhes = false // Novo parâmetro para incluir Fornecedor e Categoria
}) {
  try {
    const whereClause = {};
    if (descricao) {
      whereClause.descricao = { [Op.like]: `%${descricao}%` };
    }
    if (fornecedorId) {
      whereClause.fornecedorId = fornecedorId;
    }
    if (categoriaDespesaId) {
      whereClause.categoriaDespesaId = categoriaDespesaId;
    }
    if (status) {
      whereClause.status = status;
    }
    if (dataVencimentoInicio && dataVencimentoFim) {
      whereClause.dataVencimento = { [Op.between]: [parseISO(dataVencimentoInicio), parseISO(dataVencimentoFim)] };
    } else if (dataVencimentoInicio) {
      whereClause.dataVencimento = { [Op.gte]: parseISO(dataVencimentoInicio) };
    } else if (dataVencimentoFim) {
      whereClause.dataVencimento = { [Op.lte]: parseISO(dataVencimentoFim) };
    }

    if (dataPagamentoInicio && dataPagamentoFim) {
      whereClause.dataPagamento = { [Op.between]: [parseISO(dataPagamentoInicio), parseISO(dataPagamentoFim)] };
    } else if (dataPagamentoInicio) {
      whereClause.dataPagamento = { [Op.gte]: parseISO(dataPagamentoInicio) };
    } else if (dataPagamentoFim) {
      whereClause.dataPagamento = { [Op.lte]: parseISO(dataPagamentoFim) };
    }


    const includeOptions = [];
    if (incluirDetalhes === 'true' || incluirDetalhes === true) {
        includeOptions.push(
            { model: Fornecedor, as: 'fornecedor', attributes: ['id', 'nomeFantasia'] },
            { model: CategoriaDespesa, as: 'categoriaDespesa', attributes: ['id', 'nome'] },
            { model: Funcionario, as: 'funcionarioCriadorContaPagar', attributes: ['id', 'nomeCompleto']}
        );
    }


    const contas = await ContaPagar.findAll({
      where: whereClause,
      include: includeOptions,
      order: [['dataVencimento', 'ASC'], ['id', 'ASC']],
    });
    return contas;
  } catch (error) {
    console.error("Erro ao listar contas a pagar no serviço:", error.message);
    throw new Error('Falha ao buscar lista de contas a pagar.');
  }
}

module.exports = listarContasPagarServices;
