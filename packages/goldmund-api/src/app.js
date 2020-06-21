const express = require("express");
const helmet = require("helmet")
const cors = require("cors");
const morgan = require("morgan");
const { winstonRotations } = require("./services/winston-rotation.js");
const setXClacksHeader = require("./middleware/x-clacks-overhead.js");
const setXPoweredByHeader = require("./middleware/x-powered-by.js");

/* Configurations */
require("./db/mongoose.js");
const entryRouter = require("./routes/entry-route.js");
const userRouter = require("./routes/user-route.js");
const emailRouter = require("./routes/email-route.js");

const app = express();
const port = process.env.PORT || 5000

/* Utils */

app.use(helmet.frameguard({action: 'deny'}));
app.use(setXClacksHeader);
app.use(setXPoweredByHeader);
// TODO Implement Fisher-Yates Algorithm fun
// const sixtyDaysInSeconds = 5184000
// app.use(helmet.hsts({
//     maxAge: sixtyDaysInSeconds,
//     includeSubDomains: false
//   }));

app.use(morgan("short"));
app.use(morgan("combined", { stream: winstonRotations.stream }));
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/entries", entryRouter);
app.use("/user", userRouter);
app.use("/email", emailRouter);

app.listen(port, () => console.log(`[+] Listening on port ${port}...`));

// // maintenance 
// app.use((req, res, next) => {
//     res.status(503).send({ notice: "This site has been temporarily closed for maintenance."})
 
// })