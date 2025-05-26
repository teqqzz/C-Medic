const { ContaPagar, Fornecedor, CategoriaDespesa } = require('../../models');
const { parseISO, isValid } = require('date-fns');

async function atualizarContaPagarService(id, dadosAtualizacao) {
  try {
    const conta = await ContaPagar.findByPk(id);
    if (!conta) {
      return null; // Conta não encontrada
    }

    // Não permitir alterar status se já estiver 'Paga' ou 'Cancelada' para certos campos
    if ((conta.status === 'Paga' || conta.status === 'Cancelada') &&
        (dadosAtualizacao.valorTotal || dadosAtualizacao.dataVencimento || dadosAtualizacao.fornecedorId || dadosAtualizacao.categoriaDespesaId)) {
        throw new Error(`Não é possível alterar dados financeiros ou de associação de uma conta ${conta.status.toLowerCase()}.`);
    }

    // Validações de IDs de Fornecedor e Categoria, se estiverem sendo alterados
    if (dadosAtualizacao.fornecedorId && dadosAtualizacao.fornecedorId !== conta.fornecedorId) {
      const fornecedor = await Fornecedor.findByPk(dadosAtualizacao.fornecedorId);
      if (!fornecedor) {
        throw new Error(`Fornecedor com ID ${dadosAtualizacao.fornecedorId} não encontrado.`);
      }
    }
    if (dadosAtualizacao.categoriaDespesaId && dadosAtualizacao.categoriaDespesaId !== conta.categoriaDespesaId) {
      const categoria = await CategoriaDespesa.findByPk(dadosAtualizacao.categoriaDespesaId);
      if (!categoria) {
        throw new Error(`Categoria de despesa com ID ${dadosAtualizacao.categoriaDespesaId} não encontrada.`);
      }
    }

    // Validação de datas, se fornecidas
    if (dadosAtualizacao.dataVencimento && !isValid(parseISO(dadosAtualizacao.dataVencimento))) {
        throw new Error("Nova data de vencimento inválida. Use o formato AAAA-MM-DD.");
    }
    if (dadosAtualizacao.dataEmissao && !isValid(parseISO(dadosAtualizacao.dataEmissao))) {
        throw new Error("Nova data de emissão inválida. Use o formato AAAA-MM-DD.");
    }
    if (dadosAtualizacao.dataPagamento && !isValid(parseISO(dadosAtualizacao.dataPagamento))) {
        throw new Error("Nova data de pagamento inválida. Use o formato AAAA-MM-DD.");
    }


    // Lógica para registrar pagamento
    if (dadosAtualizacao.status === 'Paga') {
      if (dadosAtualizacao.valorPago === undefined || dadosAtualizacao.valorPago === null || parseFloat(dadosAtualizacao.valorPago) <=0) {
        // Se não fornecer valorPago ao marcar como Paga, assume o valor total da conta
        dadosAtualizacao.valorPago = conta.valorTotal;
      }
      if (!dadosAtualizacao.dataPagamento) {
        dadosAtualizacao.dataPagamento = new Date().toISOString().slice(0,10); // Data atual se não fornecida
      }
    } else if (dadosAtualizacao.status && dadosAtualizacao.status !== 'Paga') {
      // Se o status for alterado para algo diferente de 'Paga', limpar valorPago e dataPagamento
      // a menos que explicitamente fornecidos (ex: estorno parcial, etc. - lógica mais complexa não inclusa)
      if (dadosAtualizacao.valorPago === undefined) dadosAtualizacao.valorPago = null;
      if (dadosAtualizacao.dataPagamento === undefined) dadosAtualizacao.dataPagamento = null;
    }


    // Remover campos que não devem ser atualizados diretamente
    delete dadosAtualizacao.id;
    delete dadosAtualizacao.criadoPor;
    delete dadosAtualizacao.funcionarioCriadorId;
    delete dadosAtualizacao.criadoEm;
    // atualizadoEm é gerenciado pelo Sequelize

    await conta.update(dadosAtualizacao);
    return conta;
  } catch (error) {
    console.error(`Erro ao atualizar conta a pagar ID ${id} no serviço:`, error.message);
    if (error.name === 'SequelizeValidationError' || error.message.includes('não encontrado') || error.message.includes('inválida') || error.message.includes('Não é possível alterar')) {
        throw error;
    }
    throw new Error('Falha interna ao atualizar conta a pagar.');
  }
}

module.exports = atualizarContaPagarService;
