const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");

require('dotenv').config();
require("./db/mongoose.js");
const entryRouter = require("./routes/entries.js");
const userRouter = require("./routes/users.js");
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(entryRouter);
app.use(userRouter);
app.use(cors());
app.use(morgan("combined"))

app.listen(port, () => console.log(`[+} Listening on port ${port}...`));