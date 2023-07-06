const mongoose = require("mongoose");
exports.mongoConnection = mongoose
  .connect(process.env.mongoose_url)
  .then((value) => {
    console.log("-->> MongoDB connected successfully");
  })
  .catch((err) => console.log("MongoDB connection error -> ", err));