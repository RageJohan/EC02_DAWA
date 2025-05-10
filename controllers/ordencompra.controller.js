const db = require('../models');
const OrdenCompra = db.OrdenCompra;

exports.findAll = async (req, res) => {
  const data = await OrdenCompra.findAll({ include: db.Laboratorio });
  res.json(data);
};

exports.findOne = async (req, res) => {
  const data = await OrdenCompra.findByPk(req.params.id, { include: db.Laboratorio });
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await OrdenCompra.create(req.body);
  res.json(data);
};

exports.update = async (req, res) => {
  await OrdenCompra.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "Orden de compra actualizada" });
};

exports.delete = async (req, res) => {
  await OrdenCompra.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: "Orden de compra eliminada" });
};
