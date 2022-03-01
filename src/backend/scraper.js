require("dotenv").config();
const { user_handles } = require("./config");
const { writeFile } = require("fs/promises");
const {
  getAllMentionsByUserId,
  searchTweetsMentioning,
  searchAllTweetsMentioning,
} = require("./controller-mentions");
// console.log(user_handles);
const { adapterTwitterMentionToDbMention } = require("./adapter-twitter-to-db");
const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./model/mentions-schema");

// let generator = getAllMentionsByUserId(4650859756);
let tweetGenerator = searchAllTweetsMentioning("bankofbaroda");

async function wait(seconds) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(true), seconds * 1000)
  );
}

(async function scrape() {
  const output = [];
  //   for (let i = 0; i < user_handles.length; i++) {
  //     try {
  //       const user = user_handles[i];
  //       const mentions = await getMentionsByUserId(user.id);
  //       output.push(mentions);
  //     } catch (err) {
  //       console.log("Error Getting Mentions", err);
  //     }
  //   }
  //   for await (let value of generator) {
  //     output.push(value);
  //     console.log("ok");
  //   }
  //   const { data, includes, meta } = await searchTweetsMentioning("bankofbaroda");
  //   console.log({ meta });

  let i = 0;
  for await (let tweet of tweetGenerator) {
    output.push(tweet);
    console.log("ok", i);
    const { data, includes, meta } = tweet;
    const validData = await mentionDataSchema.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const validIncludes = await mentionIncludesSchema.validateAsync(includes, {
      allowUnknown: true,
      stripUnknown: true,
    });
    // console.log({ validData, validIncludes });
    // i = 2;
    // const dbModels = adapterTwitterMentionToDbMention(
    //   validData[i],
    //   validIncludes.users[i]
    // );
    // for (model of dbModels) {
    //   console.log(model.constructor.name, model.dataValues);
    // }
    // await save(dbModels);
    await wait(10);
    i++;

    await writeFile(
      `test_${new Date().toISOString()}.json`,
      JSON.stringify({ validData, validIncludes })
    );
    console.log("written");
  }
})();
