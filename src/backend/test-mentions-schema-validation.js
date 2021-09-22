const mentionTwitterResponse = require("./mentions.json");
const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./model/mentions-schema");

const { data, includes } = mentionTwitterResponse;

(async function test() {
  try {
    const validData = await mentionDataSchema.validateAsync(data);
    const validIncludes = await mentionIncludesSchema.validateAsync(includes);
  } catch (err) {
    console.log("TEST FAILED. ERROR validating user schema");
    console.log(err);
  }
  console.log("TEST PASSED");
})();
