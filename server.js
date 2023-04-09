const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const app = require("./app");
const { MONGO_URL, PORT = 3000 } = process.env;

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
main();
