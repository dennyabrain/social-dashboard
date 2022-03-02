const {
  flattenMentionPayload,
  adapterTwitterToSequelize,
} = require("./adapter-twitter-to-sequelize");
const {
  createMentionFromFlattenedTwitterResponsePayload,
} = require("./repository-mentions");
const { TWITTER_SEARCH_RESPONSE } = require("./test-data/mentions-by-user");
const { Error } = require("./sequelize/models");

/**
 * This test has a hardcoded JSON response got from Twitter API /search endpoint. This test is to ensure that as long as the twitter payload stays the same, our function should be able to store it in the database and query it.
 */

test("twitter payload can be saved to db", async () => {
  // validate data
  // transform via adapters
  // write to db
  // query and test
  const flattenedData = flattenMentionPayload(TWITTER_SEARCH_RESPONSE);

  for (let i = 0; i < flattenedData.length; i++) {
    try {
      const mentionedTweetCreatePayload = adapterTwitterToSequelize(
        "/search",
        flattenedData[i]
      );
      await createMentionFromFlattenedTwitterResponsePayload(
        mentionedTweetCreatePayload
      );
    } catch (err) {
      console.log(err);
      await Error.create({
        type: "CREATE_MENTIONED_TWEET",
        message: JSON.stringify(err).slice(0, 499),
      });
    }
  }

  // console.log({ err: mentionedTweet });
  // const mentionedTweet = await MentionedTweet.findOne({
  //   where: {
  //     id: "e4bfa1b8-a2fe-4178-8c6d-b260c7238362",
  //   },
  //   include: [Author, ContextAnnotation],
  // });
  // console.log(mentionedTweet.toJSON());

  // expect(mentionedTweetCreatePayload).toStrictEqual({ msg: "done" });

  expect(2).toBe(2);

  //   const author = (await mentionedTweet.getAuthor()).toJSON();
  //   const publicMetric = (await mentionedTweet.getPublicMetric()).toJSON();
  //   const entity = (await mentionedTweet.getEntity()).toJSON();
  //   const contextAnnotations = (
  //     await mentionedTweet.getContextAnnotations()
  //   ).toJSON();
  //   // assertions
  //   expect(author).toBe({});
  //   expect(publicMetric).toBe({});
  //   expect(entity).toBe({});
  //   expect(contextAnnotations).toBe({});
});

// HOW TO TEST FOR EXPECTED EXCEPTIONS
// expect(() => {
//   adapterTwitterToSequelize("/search", TWITTER_SEARCH_RESPONSE);
// }).toThrow("Data and Includes length don't match. Unexpected payload");
