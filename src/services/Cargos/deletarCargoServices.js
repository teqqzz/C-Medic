const { Cargo, Funcionario } = require('../../models'); 

const deletarCargoServices = async (id) => {
    const cargo = await Cargo.findByPk(id);
    if (!cargo) {
        return null; 
    }

    const funcionariosComEsteCargo = await Funcionario.count({ where: { cargoId: id } });
    if (funcionariosComEsteCargo > 0) {
        throw new Error(`Não é possível deletar o cargo "${cargo.nomeCargo}". Existem ${funcionariosComEsteCargo} funcionário(s) associado(s) a ele.`);
    }

    await cargo.destroy();
    return true; 
};

module.exports = deletarCargoServices;