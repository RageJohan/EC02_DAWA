const db = require("../models");
const Orden = db.OrdenCompra;
const Laboratorio = db.Laboratorio;

exports.index = async (req, res) => {
  const ordenes = await db.OrdenCompra.findAll({ include: db.Laboratorio });
  const token = req.query.token;
  res.render("ordencompra/index", { ordenes, token });
};

exports.showCreate = async (req, res) => {
  const laboratorios = await db.Laboratorio.findAll();
  const token = req.query.token;
  res.render("ordencompra/create", { laboratorios, token });
};

exports.create = async (req, res) => {
  await db.OrdenCompra.create(req.body);
  res.redirect(`/ordenes?token=${req.body.token}`);
};

exports.showEdit = async (req, res) => {
  const orden = await db.OrdenCompra.findByPk(req.params.id);
  const laboratorios = await db.Laboratorio.findAll();
  const token = req.query.token;
  res.render("ordencompra/edit", { orden, laboratorios, token });
};

exports.update = async (req, res) => {
  await db.OrdenCompra.update(req.body, { where: { id: req.params.id } });
  res.redirect(`/ordenes?token=${req.body.token}`);
};

exports.delete = async (req, res) => {
  await db.OrdenCompra.destroy({ where: { id: req.params.id } });
  res.redirect(`/ordenes?token=${req.body.token}`);
};