const db = require('../models');
const Laboratorio = db.Laboratorio;

exports.findAll = async (req, res) => {
  const data = await Laboratorio.findAll();
  res.json(data);
};

exports.findOne = async (req, res) => {
  const data = await Laboratorio.findByPk(req.params.id);
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Laboratorio.create(req.body);
  res.json(data);
};

exports.update = async (req, res) => {
  await Laboratorio.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: "Laboratorio actualizado" });
};

exports.delete = async (req, res) => {
  await Laboratorio.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: "Laboratorio eliminado" });
};
