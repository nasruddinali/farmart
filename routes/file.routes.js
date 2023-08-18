const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authenticateToken = require('../middleware/auth').verifyToken;

router.post("/files/upload", upload.single("file"), fileController.uploadFile);
router.get("/files/upload", fileController.uploadPage)
router.get("/home", fileController.homePage);
router.get('/files/get/:id', fileController.getById);
router.get('/files/get', fileController.get);



module.exports = router;
