const express = require("express");
const app = express();
const path = require("path");
const publicData = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;

app.use(express.static(publicData));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicData, "index.html"));
});

app.listen(port, () => {
  console.log("Sever is up");
});
