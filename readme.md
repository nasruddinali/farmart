# Farmart

## About
Node.JS App to upload a file to and store short url

### Features
- uploading a file which will be uploaded to AWS S3 
- storing file in mongoDB as object which will have short url, s3 url, name of that file
- user registration, login
- authentication

### Application uses
- Express js
- nodejs
- Jason web token
- mongoDB
- HTML
- CSS
### Steps to setup application locally
1. npm install
2. npm run start

## APIS
URL: http://localhost:3000/api/v1/home
a home page which provides either login, ragister, and upload option

method: GET    URL: http://localhost:3000/api/v1/files/upload / 

renders api to upload file which accepts .pdf, .doc, .docx, .jpg,  jpeg.

after uploading in response we get original name of the file, S3 Url, and short url 
{
    "originalname":"FarMart __ Full Stack Developer Assignment (1).pdf",
    "location":"https://famart.s3.ap-south-1.amazonaws.com/1692364777958-%7BBagblvVmA-FarMart%20__%20Full%20Stack%20Developer%20Assignment%20%281%29.pdf",
    "shortUrl":"http://famart.com/A09su1i_N"
}


Read access to S3 url is public
which is then stored in Mongo DB the scema of mongoDB document for the file strong is as follows
{
    originalname,
    s3url, 
    shortUrl,
    userId
}
#file Upload API : 
all CRUD APIs for files

User can register
User can login

Hosting URL for uploading URL: http://13.126.252.141/api/v1/files/upload
get all files URL: http://13.126.252.141/api/v1/files/get
get file by Id URL:URL: http://13.126.252.141/api/v1/files/get:id


## TODO: 
host on public platform to share endpoint
