const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require("morgan");

require("dotenv").config();
require("./db/mongoose.js");
const entryRouter = require("./routes/entry.js");
const userRouter = require("./routes/user.js");
const app = express();
const port = process.env.PORT || 5000


// app.use((req, res, next) => {
//     console.log(req.method, req.path);
//     next();
// });


app.use(morgan("combined"));
app.use(cors());
app.use(express.json());


// routes
app.use(entryRouter);
app.use(userRouter);


app.listen(port, () => console.log(`[+] Listening on port ${port}...`));

// // maintenance 
// app.use((req, res, next) => {
//     res.status(503).send({ notice: "This site has been temporarily closed for maintenance."})
 
// })