const dotenv = require("dotenv");
const { adapterTwitterMentionToDbMention } = require("./adapter-twitter-to-db");
dotenv.config();

const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./model/mentions-schema");

async function testModelCreationWithLocalData() {
  const mentionTwitterResponse = require("./mentions.json");
  const { data, includes } = mentionTwitterResponse;

  const validData = await mentionDataSchema.validateAsync(data);
  const validIncludes = await mentionIncludesSchema.validateAsync(includes);

  // const query = await save({}, validData[0], validIncludes.users[0]);
  i = 2;
  const dbModels = adapterTwitterMentionToDbMention(
    validData[i],
    validIncludes.users[i]
  );
  for (model of dbModels) {
    console.log(model.constructor.name, model.dataValues);
  }
}

async function testModelCreationWithRemoteData() {
  const { getMentionsByUserId, save } = require("./controller-mentions");

  let continueFetching = true;
  let paginationToken = undefined;
  while (continueFetching) {
    console.log("PAGINATION TOKEN : ", paginationToken);
    const { data, includes, meta } = await getMentionsByUserId(
      "4650859756",
      paginationToken
    );
    console.log("Fetched : ", data.length);
    if (!meta.next_token) {
      continueFetching = false;
    }
    paginationToken = meta.next_token;

    const validData = await mentionDataSchema.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const validIncludes = await mentionIncludesSchema.validateAsync(includes, {
      allowUnknown: true,
      stripUnknown: true,
    });
    for (let i = 0; i < validData.length; i++) {
      try {
        const dbModels = await adapterTwitterMentionToDbMention(
          validData[i],
          validIncludes.users[i]
        );
      } catch (err) {
        console.log("Error inserting", i);
        console.log({ data: validData[i], user: validIncludes.users[i] });
      }
    }
  }
}

(async function test() {
  try {
    // testModelCreationWithLocalData();
    await testModelCreationWithRemoteData();
  } catch (err) {
    console.log("TESTS FAILED. ERROR validating user schema");
    console.log(err);
  }
})();
