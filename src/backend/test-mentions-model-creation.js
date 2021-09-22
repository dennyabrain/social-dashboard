const dotenv = require("dotenv");
dotenv.config();
const { getMentionsByUserId, save } = require("./controller-mentions");
const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./model/mentions-schema");

(async function test() {
  try {
    const { data, includes } = await getMentionsByUserId("4650859756");
    const validData = await mentionDataSchema.validateAsync(data);
    const validIncludes = await mentionIncludesSchema.validateAsync(includes);

    const query = await save({}, validData[0], validIncludes.users[0]);
    console.log(query);

    // const mentionModel = new MentionModel({data, includes})
    // const id  = mentionModel.save()

    // const {tweet, author, publicMetrics} = mentionModel.getMentionedTweet(id);
    // const tweets = mentionModel.getAll(pageNum);
    // const {mentions, hashtags, urls, annotations, contextAnnotations} = MentionModel.getEntityById(id)
  } catch (err) {
    console.log("TEST FAILED. ERROR validating user schema");
    console.log(err);
  }
  console.log("TEST PASSED");
})();
