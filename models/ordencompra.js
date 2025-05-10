'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {

    static associate(models) {
      OrdenCompra.belongsTo(models.Laboratorio, {
        foreignKey: 'CodLab'
      });      
    }
  }
  OrdenCompra.init({
    fechaEmision: DataTypes.DATE,
    Situacion: DataTypes.STRING,
    Total: DataTypes.DECIMAL,
    CodLab: DataTypes.INTEGER,
    NrofacturaProv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenCompra',
  });
  return OrdenCompra;
};