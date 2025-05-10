exports.showMenu = (req, res) => {
  const { nombre = "Usuario", rol = "usuario", token = "" } = req.query;
  res.render("menu", { nombre, rol, token });
};
