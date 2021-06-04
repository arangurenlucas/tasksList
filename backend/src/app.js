const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT ? process.env.PORT : 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log("App running, port: ", PORT);
});