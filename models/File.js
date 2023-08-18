const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const fileSchema = Schema(
	{
		originalname: {
			type: String,
			require: true,
		},
		s3Url: {
			type: String,
			require: true,
		},
		shortUrl: {
			type: String,
			require: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true
		},
	},
	{
		timestamps: true,
	}
);

// encrypt the password before stori
module.exports = mongoose.model('File', fileSchema);
