const { Material } = require('../../models');
const { Op, sequelize } = require('sequelize'); 

const listarMateriaisComEstoqueBaixoServices = async () => {

    const materiaisComEstoqueBaixo = await Material.findAll({
        where: {
            quantidade: {
                [Op.lte]: sequelize.col('estoqueMinimo') 
            },
            estoqueMinimo: {
                [Op.gt]: 0 
            }

        },
        order: [
            
            ['descricao', 'ASC']
        ]
    });

    return materiaisComEstoqueBaixo;
};

module.exports = listarMateriaisComEstoqueBaixoServices;