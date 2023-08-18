const aws = require("aws-sdk");
const shortid = require("shortid");
require("dotenv").config();
const fs = require('fs')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.AWS_REGION,
});

// const deleteS3File = (key) => {
	// const s3 = new aws.S3();

// 	s3.deleteObject(
// 		{
// 			Bucket: process.env.AWS_BUCKET_NAME,
// 			Key: key,
// 		},
// 		function (err, data) {
// 			// console.log('Image deleted');
// 			if (err) {
// 				throw err;
// 			}
// 		}
// 	);
// };
function uploadFileToS3(file) {
	return new Promise((resolve, reject) => {

	  const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: `${Date.now()}-{${shortid.generate()}-${file.originalname}`,
		Body: file.buffer,
	  };
	  const s3 = new aws.S3();
	  s3.upload(params, (err, data) => {
		if (err) {
		  console.error('Error uploading file:', err);
		  reject(err);
		} else {
		  console.log('File uploaded successfully:', data.Location);
		  resolve(data.Location);
		}
	  });
	});
  }

module.exports = uploadFileToS3;
