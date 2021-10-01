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
const { aggregate } = require("./aggregate-data");

const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(cors());
app.options("*", cors());
app.use(express.static("dist"));

app.get("/tweets/page/:pgNum", async (req, res) => {
  const { pgNum } = req.params;
  const { count, rows } = await getTweets(pgNum, true);
  const minRows = rows.map((row) => row.dataValues);
  console.log({ count, minRows });
  res.json({ count, rows: minRows });
});

app.get("/tweet/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tweet,
    entityHashtag,
    entityAnnotations,
    entityMentions,
    entityURL,
    contextAnnotations,
  } = await getTweetById(id);
  res.json({
    tweet,
    entityHashtag,
    entityAnnotations,
    entityMentions,
    entityURL,
    contextAnnotations,
  });
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
      const minRowsC = tweetsByLang.rows.map((row) => row.dataValues);
      response = { count: tweetsByLang.count, tweets: minRowsC };
      break;
    case "hashtag":
      const tweetsByHashTag = await getTweetsByHashtag(pg, value);
      const minRowsA = tweetsByHashTag.rows.map((row) => row.dataValues);
      response = { tweets: minRowsA };
      break;
    case "entity":
      const tweetsByEntity = await getTweetsByContextAnnotation(pg, value);
      const minRowsB = tweetsByEntity.rows.map((row) => row.dataValues);
      response = { tweets: minRowsB };
      break;
    default:
      response = {};
  }

  res.json(response);
});

app.get("/aggregates/timeseries", async (req, res) => {
  res.json(aggregate.timeseries_data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
