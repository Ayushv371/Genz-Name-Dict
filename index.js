import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 3000;

app.use(express.static("public"));
env.config();
const options = {
  url: process.env.APIURL,
  headers: {
    "X-RapidAPI-Key": process.env.APIKEY,
    "X-RapidAPI-Host": process.env.APIHOST,
  },
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/submit", async (req, res) => {
  try {
    const result = await axios.get(options.url, {
      params: {
        term: req.query.word,
      },
      headers: options.headers,
    });
    res.render("index.ejs",{
      def1: result.data.list[0].definition,
      def2: result.data.list[1].definition,
      def3: result.data.list[2].definition,
    });
  } catch (error) {
    console.error(error);
    console.log("some error occured");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
