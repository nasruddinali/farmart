const express = require("express");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/file.routes");
const userRoutes = require("./routes/user.routes");
const expressSession = require("express-session");

const ejs = require("ejs");
const path = require("path");

connectDB();


const app = express();

const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listning to port ${port}`);
});
app.use("/api/v1", fileRoutes);

app.use("/api/v1", userRoutes);

app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "ejs");

app.get("/api/v1/home", async (req, res) => {
  res.render("index");
});

module.exports = router;
