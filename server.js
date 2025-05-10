const express = require('express');
const path = require('path');
const app = express();
const db = require('./models');

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});
// Rutas
app.use('/api/laboratorios', require('./routes/laboratorio.routes'));
app.use('/api/ordenes', require('./routes/ordencompra.routes'));
app.use('/auth', require('./routes/auth.routes')); // ¡Ojo! Aquí la cambiamos a /auth para permitir GET /auth/login
app.use('/menu', require('./routes/menu.routes'));
app.use("/laboratorios", require("./routes/laboratorio.web.routes"));
app.use("/ordenes", require("./routes/ordencompra.web.routes"));

// Sincroniza modelos y levanta servidor
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
});
