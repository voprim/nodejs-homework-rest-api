require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT || 8081;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    strictQuery: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
