const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
