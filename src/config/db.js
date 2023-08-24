require("dotenv").config();
const { connect } = require("mongoose");

const connectDB = async () => {
  const DB = process.env.DATABASE_URI;
  await connect(DB)
    .then(() => {
      console.log(`Database connected successfully...`);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  connectDB,
};
