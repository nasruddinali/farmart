const express = require("express");
const router = express.Router();
const fileController = require("../controller/file.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/homepage", fileController.homePage);

module.exports = router;
