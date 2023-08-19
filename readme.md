# Farmart

## About
Node.JS App to upload a file to and store short url

### Features
- uploading a file which will be uploaded to AWS S3 
- storing file in mongoDB as object which will have short url, s3 url, name of that file
- user registration, login
- authentication

### Application uses

- Jason web token
- mongoDB
- HTML
- CSS
### Steps to setup application locally
1. npm install
2. npm run start

## APIS
User Home: http://localhost:3000/api/v1/usres/home<br\>

a home page which provides either login, ragister. Upon logging in you will be sent to a page where you can do the intented file related tasks.

method: GET    URL: http://localhost:3000/api/v1/files/upload<br\>

Renders api to upload file which accepts .pdf, .doc, .docx, .jpg,  jpeg.

after uploading in response we get original name of the file, S3 Url, and short url 
{<br\>
    - "originalname":"FarMart __ Full Stack Developer Assignment (1).pdf",<br\>
    "location":"https://famart.s3.ap-south-1.amazonaws.com1692364777958-%7BBagblvVmA-FarMart%20__%20Full%20Stack%20Developer%20Assignment%20%281%29.pdf",<br\>
    "shortUrl":"http://famart.com/A09su1i_N"<br\>
}<br\>


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

- Home Page for User : URL: http://35.154.231.225/api/v1/users/home
- Home Page for file : http://35.154.231.225/api/v1/files/home
- using these 2 URL we can navigate the system and can access app



## TODO: 
- Implement Roles based authorisation
- Making Front-end Better making whole app as a single web page.
- showing files previews before dowwnloading


##Tech used 
- Node.JS and express
    - There are a lot of free library/ package which come in handy
    - Less effort is required
    - Easy and simple to understand
- MongoDB
    - In this app we wanted to store data as file. which is unstructured;
