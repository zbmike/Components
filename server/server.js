const path = require("path");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const fsPromises = fs.promises;

app.get(
  "/api/get-music",
  cors({
    origin: "http://localhost:3000",
  }),
  async function (req, res) {
    const musicPath = path.join(__dirname, "..", "build", "music");
    const imagePath = path.join(__dirname, "..", "build", "images");

    const filenames = {};
    const files = await fsPromises
      .readdir(musicPath)
      .catch((err) => console.error(err));
    files.forEach((file) => {
      const key = file.split(".")[0];

      filenames[key] = false;
    });

    const images = await fsPromises
      .readdir(imagePath)
      .catch((err) => console.error(err));
    images.forEach((name) => {
      const key = name.split(".")[0];
      filenames[key] = true;
    });
    console.log(filenames);
    return res.json(filenames);
  }
);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
