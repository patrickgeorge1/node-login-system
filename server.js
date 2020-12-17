require("dotenv").config;

const express = require("express");
const app = express();

// convert each JSON to js object
app.use(express.json());


// routers
const userRouter = require("./api/users/user.router");
app.use("/api", userRouter);



app.listen(process.env.APP_PORT, () => {console.log(`Server started on ${process.env.APP_PORT} `)});