const express = require("express");
const app = express();
const db = require("./db");
const  User  = require("./models/UsersModel");
const routes = require("./routes");

// require("dotenv").config();

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3001;


db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
});
