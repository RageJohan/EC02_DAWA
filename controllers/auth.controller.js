const db = require("../models");
const Usuario = db.Usuario;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const rol = "usuario";
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario", detalle: error.message });
  }
};

// LOGIN
// 🔁 Login vía formulario: redirige al menú
exports.loginWeb = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).send("Usuario no encontrado");

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      "mi_clave_secreta_jwt",
      { expiresIn: "5h" }
    );

    res.redirect(`/menu?nombre=${usuario.nombre}&rol=${usuario.rol}&token=${encodeURIComponent(token)}`);
  } catch (error) {
    res.status(500).send("Error al iniciar sesión");
  }
};

// 🔁 Login vía Postman/API: devuelve token en JSON
exports.loginApi = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      "mi_clave_secreta_jwt",
      { expiresIn: "5h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", detalle: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt']
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron listar los usuarios', detalle: error.message });
  }
};

