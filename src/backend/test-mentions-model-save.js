const dotenv = require("dotenv");
const { adapterTwitterMentionToDbMention } = require("./adapter-twitter-to-db");
dotenv.config();

const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./mentions-schema");

async function testModelSaveWithLocalData() {
  const mentionTwitterResponse = require("./mentions.json");
  const { save } = require("./controller-mentions");

  const { data, includes } = mentionTwitterResponse;

  const validData = await mentionDataSchema.validateAsync(data);
  const validIncludes = await mentionIncludesSchema.validateAsync(includes);

  // const query = await save({}, validData[0], validIncludes.users[0]);
  i = 9;
  const dbModels = adapterTwitterMentionToDbMention(
    validData[i],
    validIncludes.users[i]
  );
  await save(dbModels);
}

async function testModelCreationWithRemoteData() {
  const { getMentionsByUserId, save } = require("./controller-mentions");
  const { data, includes } = await getMentionsByUserId("4650859756");
  const validData = await mentionDataSchema.validateAsync(data, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const validIncludes = await mentionIncludesSchema.validateAsync(includes, {
    allowUnknown: true,
    stripUnknown: true,
  });
  i = 2;
  const dbModels = adapterTwitterMentionToDbMention(
    validData[i],
    validIncludes.users[i]
  );
  // for (model of dbModels) {
  //   console.log(model.constructor.name, model.dataValues);
  // }
  // await save(dbModels);
}

(async function test() {
  try {
    // testModelSaveWithLocalData();
    testModelCreationWithRemoteData();
  } catch (err) {
    console.log("TESTS FAILED. ERROR validating user schema");
    console.log(err);
  }
  console.log("TEST PASSED");
})();
