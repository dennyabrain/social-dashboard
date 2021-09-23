const dotenv = require("dotenv");
dotenv.config();
const {
  getUserByName,
  getMentionsByUserId,
  getTweets,
  getTweetById,
  getTweetsByLanguage,
  getTweetsByLocation,
  getTweetsByHashtag,
  getTweetsByContextAnnotation,
} = require("./controller-mentions");
const { ModelMention } = require("./model-mentions");
const { writeFile } = require("fs/promises");
const { config } = require("./config");
const {
  setup,
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityURL,
} = require("./service-db");
const { nanoid } = require("nanoid");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Financial Dashboard");
});

app.get("/tweets/page/:pgNum", async (req, res) => {
  const { pgNum } = req.params;
  const { count, rows } = await getTweets(pgNum, true);
  const minRows = rows.map((row) => row.dataValues);
  res.json({ count, rows: minRows });
});

app.get("/tweet/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await getTweetById(id);
  res.json(tweet.dataValues);
});

// /tweets/query?type=language&value=NarendraModi
// req.query.id);
app.get("/tweets/query", async (req, res) => {
  const { type, value, pg } = req.query;
  // res.send("Query Received!");
  let response;
  switch (type) {
    case "language":
      const tweetsByLang = await getTweetsByLanguage(pg, value);
      response = { count: tweetsByLang.count, tweets: minRows };
      break;
    case "hashtag":
      const tweetsByHashTag = await getTweetsByHashtag(pg, value);
      const minRowsA = tweetsByHashTag.rows.map((row) => row.dataValues);
      response = { tweets: minRowsA };
      break;
    case "entity":
      const tweetsByEntity = await getTweetsByHashtag(pg, value);
      const minRowsB = tweetsByEntity.rows.map((row) => row.dataValues);
      response = { count, tweets: minRowsB };
      break;
    default:
      response = {};
  }

  res.json(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
