const File = require("../models/File");
const path = require("path");
const uplaodToS3 = require('../utils/aws')
const shortid = require('shortid')


const getById = async (req, res)=> {
  try {
    const id  = req.params.id;
    const item = await File.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      res.json(items);
    } else {
      res.json(item);
    }
    
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}
const get = async (req, res)=> {
  try {
    const files = await File.find();
    res.json(files)
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}
const uploadPage = async (req, res)=>{
  res.render("upload");
}
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
      res.status(200).send({originalname, location,shortUrl});
    } catch (err) {a
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  const homePage = (req,res)=> {
    res.render("index");
  }

module.exports = { uploadFile, homePage ,uploadPage,get,getById};
