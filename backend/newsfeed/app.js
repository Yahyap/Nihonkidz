require("dotenv").config();

const cors = require("cors");
const express = require("express");
const testRoutes = require("./routes/test");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

app.use("/test", testRoutes);

app.get("/", function (req, res) {
  res.send(`Hallo`);
});

console.log(process.env.JWT_SECRET);

const server = app.listen(8084, function () {
  const port = server.address().port;

  console.log("Example app listening at http://localhost:%s", port);
});
