const express = require("express");
const connect = require("./config/db");
const appRoutes = require("./routes");

const app = express();

//connect db
connect();

app.use(express.json({ extended: false }));

app.use(appRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Running"));
