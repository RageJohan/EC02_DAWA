'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // relaciones futuras si deseas
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'usuario' // puede ser 'usuario', 'moderador', o 'admin'
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
