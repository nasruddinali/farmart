const router = require("express").Router();

const userController = require("../controller/user.controller");




router.post("/users/signup", userController.signUp);
router.post("/users/login", userController.login);


router.post("/users/allUsers", userController.findAllUser);

module.exports = router;