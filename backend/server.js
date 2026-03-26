require('dotenv').config()
const app = require("./src/app");
const connectDB = require('./src/config/db')

connectDB()
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
