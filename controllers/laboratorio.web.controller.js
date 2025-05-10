const db = require("../models");
const Laboratorio = db.Laboratorio;

exports.list = async (req, res) => {
  const laboratorios = await Laboratorio.findAll();
  const token = req.query.token; // ✅ extraer token del query
  res.render("laboratorio/index", { laboratorios, token }); // ✅ pasar a la vista
};


exports.showCreate = (req, res) => {
  const token = req.query.token;
  res.render("laboratorio/create", { token });
};

exports.create = async (req, res) => {
  console.log("🔎 BODY recibido en controller:", req.body);
  await Laboratorio.create(req.body);
  res.redirect(`/laboratorios?token=${req.body.token}`);
};


exports.showEdit = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id);
  const token = req.query.token;
  res.render("laboratorio/edit", { lab, token });
};


exports.update = async (req, res) => {
  await Laboratorio.update(req.body, { where: { id: req.params.id } });
  res.redirect(`/laboratorios?token=${req.body.token}`);
};


exports.delete = async (req, res) => {
  await Laboratorio.destroy({ where: { id: req.params.id } });
  res.redirect(`/laboratorios?token=${req.body.token}`);
};

