const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authenticateToken = require('../middleware/auth').verifyToken;

router.get('/home', fileController.fileHome)
router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/upload", fileController.uploadPage)
router.get('/findById/:id', fileController.getById);
router.get('/get/getbyidpage', fileController.getByIdPage);
router.get('/findAll', fileController.get);
router.get('/page', fileController.getallpage);



module.exports = router;
