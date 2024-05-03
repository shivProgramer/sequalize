const express = require("express");
var bodyParser = require("body-parser");
require("./models/index");

var userCtrl = require("./controllers/userController");

const app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

// routes
app.get("/add", userCtrl.addUser);
app.get("/users", userCtrl.getUser);
app.get("/users/:id", userCtrl.getSingleUser);
app.post("/users", userCtrl.postUsers);
app.post("/user/bulk", userCtrl.postBulkData);
app.delete("/users/:id", userCtrl.deleteUser);
app.patch("/users/:id", userCtrl.patchUser);

app.listen(3000, () => {
  console.log("api will run on : 3000");
});
