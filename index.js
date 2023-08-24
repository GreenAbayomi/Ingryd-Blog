require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const PORT = process.env.PORT || 3030;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}...`);
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

startServer();
