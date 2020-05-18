require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.CLOUD_MONGO, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
