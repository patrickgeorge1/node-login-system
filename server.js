const express = require("express");
const app = express();
const user_repository = require("./User/user_repository").user_repository;
// const database_connection = require("./mysql/mysql_connector");

// import routes
const authRoute = require("./routes/auth");

// route middleware
app.use("/api/user", authRoute);


// logic
user_repository.getUser(1)
.then((rows) => {
    console.log(rows);
})
.catch((err) => {
    console.log(err);
});



app.listen(8080, () => {console.log("Server started successfully !")});