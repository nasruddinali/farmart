const express = require("express");
const connectDB = require("./config/db");
const fileRoutes = require("./routes/file.routes");
const userRoutes = require("./routes/user.routes");
var flash = require("connect-flash");
const path = require("path");

connectDB();

const app = express();
app.use(flash());
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listning to port ${port}`);
});
app.use("/api/v1/files", fileRoutes);

app.use("/api/v1/users", userRoutes);

app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "ejs");



module.exports = router;
