const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    (req.headers && req.headers["x-access-token"]) ||
    (req.body && req.body.token) ||
    (req.query && req.query.token);

  console.log("🔍 Token recibido:", token); // 👈 LOG TEMPORAL
  console.log("req.body:", req.body);
  console.log("token desde body:", req.body?.token);

  if (!token) return res.status(403).send({ message: "No se proporcionó token" });

  jwt.verify(token, "mi_clave_secreta_jwt", (err, decoded) => {
  if (err) {
    console.log("❌ Error en verificación:", err.message);
    return res.status(401).send({ message: "Token inválido" });
  }
  req.userId = decoded.id;
  req.rol = decoded.rol;
  next();
});

};

const isAdmin = (req, res, next) => {
  if (req.rol === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Requiere rol de administrador" });
  }
};

const isModerador = (req, res, next) => {
  if (req.rol === "moderador" || req.rol === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Requiere rol de moderador o administrador" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerador,
};
