const Material = require("../../models/materialModel");

const listarMateriaisServices = () => {
    return Material.find();
}

module.exports = listarMateriaisServices;
