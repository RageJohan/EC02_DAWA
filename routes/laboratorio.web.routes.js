const express = require("express");
const router = express.Router();
const controller = require("../controllers/laboratorio.web.controller");
const { verifyToken, isModerador, isAdmin } = require("../middlewares/authJwt");

router.get("/", verifyToken, controller.list); // todos los roles

router.get("/create", verifyToken, isModerador, controller.showCreate);
router.post("/create", verifyToken, isModerador, controller.create);

router.get("/edit/:id", verifyToken, isModerador, controller.showEdit);
router.post("/edit/:id", verifyToken, isModerador, controller.update);

router.post("/delete/:id", verifyToken, isAdmin, controller.delete);


module.exports = router;
