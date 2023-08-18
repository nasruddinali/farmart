const shortid = require('shortid')
const generateShortUrl =() => {
  
        
        const  id = shortid.generate();
        var shortid =  "http://short.url/".concat(id);
        return shortUrl; 
}

module.exports = generateShortUrl