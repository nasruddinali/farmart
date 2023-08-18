const File = require("../models/File");
const path = require("path");
const uplaodToS3 = require('../utils/aws')
const shortid = require('shortid')

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

const homePage = (req, res) => {
  const indexPath = path.join(
    __dirname,
    "../../farmart/views",
    "homepage.html"
  );
  res.status(200).sendFile(indexPath);
  //  res.status(200).send("indexPath");
};

module.exports = { uploadFile, homePage };
