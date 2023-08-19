const router = require("express").Router();

const userController = require("../controller/user.controller");
const { route } = require("./file.routes");

router.post("/register", userController.register);
router.get("/register", userController.registerForm);
router.post("/login", userController.login);
router.get("/login", userController.loginForm);
router.get("/logout", userController.logout);
router.post("/get", userController.findAllUser);
router.get("/error", userController.error);
router.get("/get:id", userController.getUserById);
router.get("/home", userController.home);
module.exports = router;
