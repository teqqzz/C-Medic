// src/models/loteMaterialModel.js
const { DataTypes } = require('sequelize');
const { database } = require('../config/database');

const LoteMaterial = database.define('LoteMaterial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    materialId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'materiais', 
            key: 'id'
        }
    },
    fornecedorId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: 'fornecedores', 
            key: 'id'
        }
    },
    numeroLote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataFabricacao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    dataValidadeLote: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    quantidadeEntradaLote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        }
    },
    quantidadeAtualLote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    precoCustoUnitarioLote: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    dataEntradaSistema: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'lotes_material',
    timestamps: true,
    indexes: [
        {
            name: 'lotes_material_material_id_numero_lote_fornecedor_id_unique', 
            unique: true,
            fields: ['materialId', 'numeroLote', 'fornecedorId']
        }
    ]
});

module.exports = LoteMaterial;
