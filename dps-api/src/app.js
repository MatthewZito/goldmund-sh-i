const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");
require("dotenv").config();
require("./db/mongoose.js");
const entryRouter = require("./routes/entry-route.js");
const userRouter = require("./routes/user-route.js");
const emailRouter = require("./routes/email-route.js");
const app = express();
const port = process.env.PORT || 5000

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// routes
app.use(entryRouter);
app.use(userRouter);
app.use(emailRouter);

app.listen(port, () => console.log(`[+] Listening on port ${port}...`));

// // maintenance 
// app.use((req, res, next) => {
//     res.status(503).send({ notice: "This site has been temporarily closed for maintenance."})
 
// })