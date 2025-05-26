
const { Material } = require('../../models');
const { Op } = require('sequelize');
const { addMonths, format } = require('date-fns');

const listarMateriaisProximosVencimentoServices = async (mesesAntecedencia = 3) => {
    if (isNaN(parseInt(mesesAntecedencia)) || parseInt(mesesAntecedencia) < 0) {
        throw new Error('Meses de antecedência deve ser um número não negativo.');
    }

    const dataLimite = addMonths(new Date(), parseInt(mesesAntecedencia));
    const dataAtual = new Date();

    const materiais = await Material.findAll({
        where: {
            vencimento: {
                [Op.ne]: null, 
                [Op.gte]: format(dataAtual, 'yyyy-MM-dd'), 
                [Op.lte]: format(dataLimite, 'yyyy-MM-dd')  
            },
            quantidade: {
                [Op.gt]: 0
            }
        },
        order: [['vencimento', 'ASC']],
    });

    return materiais;
};

module.exports = listarMateriaisProximosVencimentoServices;
