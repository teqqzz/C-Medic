const listarMateriaisServices = require("../../services/Materiais/listarMateriaisServices");

const listarMateriaisController = async (req, res) = > {
    try {
        const materiais = await listarMateriaisServices();
        res.status(200).json(materiais);
    }
    catch(err){
        console.error("Erro ao listar materiais:", err);
        res.status(500).json({ mensagem: "Erro ao obter materiais", erro: err.message});
    }
};

module.exports = listarMateriaisController;