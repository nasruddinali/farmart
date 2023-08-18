const router = require("express").Router();

const userController = require("../controller/user.controller");
const { route } = require("./file.routes");

router.post(
  "/users/register",
  userController.register
);
router.get("/users/register", userController.registerForm);
router.post(
  "/users/login",
  userController.login
);
router.get("/users/login", userController.loginForm);
router.get("/user/logout", userController.logout);
router.post("/users/allUsers", userController.findAllUser);

module.exports = router;
