const express = require("express");
const connectDB = require("./config/db");
const fileRoutes = require('./routes/file.routes')
const userRoutes = require('./routes/user.routes')

connectDB();

const app = express();

const router =express.Router()

app.use(express.json())


const port = 80;
app.listen(port, () => {
  console.log(`listning to port ${port}`);
});
app.use('/api/v1', fileRoutes);

app.use('/api/v1', userRoutes)


app.get('/',(req, res)=> {
  res.send("done");
})


// routes/auth.js




module.exports = router;
