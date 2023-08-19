const File = require("../models/File");
const path = require("path");
const uplaodToS3 = require("../utils/aws");
const shortid = require("shortid");
const fs = require("fs");
const mongoose = require('mongoose')

const getById = async (req, res) => {
  try {
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
  
      return res.status(404).json({ message: `invalid object id ${req.params.id}` });
    }
    const id = req.params.id;
    
    const item = await File.findById(id);
    console.log(`item------------------------> ${item}`)
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      return res.json(item);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const get = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const totalFiles = await File.countDocuments();
    const totalPages = Math.ceil(totalFiles / pageSize);
    const files = await File.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const uploadPage = async (req, res) => {
  res.render("upload");
};
const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file Uploaded");
    }

    const { originalname } = req.file;

    const location = await uplaodToS3(file);
    const shortUrl = `http://famart.com/${shortid.generate()}`;

    const fileToSave = new File();

    fileToSave.originalname = originalname;
    fileToSave.s3Url = location;
    fileToSave.shortUrl = shortUrl;

    await fileToSave.save();
    res.status(200).send({ originalname, location, shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

const homePage = (req, res) => {
  res.render("home");
};

const fileHome = (req, res) => {
  res.render("filesHome");
};
const getByIdPage = (req, res) => {
  res.render('getFileById');
}
const getallpage = (req, res)=> {
  res.render('showFiles')
}
module.exports = { uploadFile, homePage, uploadPage, get, getById, fileHome,getByIdPage, getallpage};
