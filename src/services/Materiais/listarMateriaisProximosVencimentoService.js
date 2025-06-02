const { Material, Fornecedor, Sequelize } = require('../../models'); // Ajuste o caminho
const { Op } = require('sequelize');
const { addDays, format, startOfDay, differenceInDays, parseISO } = require('date-fns'); // Adicionado differenceInDays e parseISO

async function listarMateriaisProximosVencimentoService({ diasAntecedencia = 60, incluirVencidos = false }) {
  try {
    const hoje = startOfDay(new Date());
    const dataLimite = addDays(hoje, diasAntecedencia);

    const whereClause = {
      vencimento: {
        [Op.ne]: null, // Apenas materiais com data de vencimento definida
        [Op.lte]: dataLimite, // Vence até a data limite
      },
      quantidade: {
        [Op.gt]: 0, // Apenas materiais com quantidade em estoque
      },
      // ativo: true // Opcional: se houver campo 'ativo'
    };

    if (!incluirVencidos) {
      whereClause.vencimento[Op.gte] = hoje; // Não incluir já vencidos (vencimento >= hoje)
    }
    // Se incluirVencidos for true, o Op.gte não é aplicado para 'vencimento',
    // então os vencidos (vencimento < hoje) que também satisfazem vencimento <= dataLimite serão incluídos.

    const materiais = await Material.findAll({
      where: whereClause,
      include: [
        {
          model: Fornecedor,
          as: 'fornecedorPrincipal', // Certifique-se que este alias está definido no seu indexModel.js
          attributes: ['id', 'nomeFantasia'],
          required: false,
        },
      ],
      attributes: [
        'id',
        'descricao',
        'codigo',
        'quantidade',
        'vencimento',
      ],
      order: [['vencimento', 'ASC']], // Mais próximos primeiro
    });
    
    return materiais.map(m => {
        const matJson = m.toJSON();
        if (matJson.vencimento) {
            const dataVencimentoMaterial = startOfDay(parseISO(matJson.vencimento));
            matJson.diasParaVencer = differenceInDays(dataVencimentoMaterial, hoje);
        } else {
            matJson.diasParaVencer = null;
        }
        return matJson;
    });

  } catch (error) {
    console.error("Erro ao listar materiais próximos ao vencimento:", error.message);
    throw new Error('Falha ao buscar materiais próximos ao vencimento.');
  }
}

module.exports = listarMateriaisProximosVencimentoService;
