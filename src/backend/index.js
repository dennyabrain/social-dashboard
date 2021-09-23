const dotenv = require("dotenv");
dotenv.config();
const {
  getUserByName,
  getMentionsByUserId,
  getTweets,
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

async function test() {
  // await setup();
  // let continueFetching = true;
  // let paginationToken = undefined;
  // while (continueFetching) {
  //   console.log("PAGINATION TOKEN : ", paginationToken);
  //   const { data, includes, meta } = await getMentionsByUserId(
  //     "3605291666",
  //     paginationToken
  //   );
  //   console.log("Fetched : ", data.length);
  //   if (!meta.next_token) {
  //     continueFetching = false;
  //   }
  //   paginationToken = meta.next_token;
  // }
}

try {
  test();
} catch (err) {
  console.log("ERROR");
  console.log(err);
}
