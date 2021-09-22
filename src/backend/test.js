const dotenv = require("dotenv");
dotenv.config();
const mentionTwitterResponse = require("./mentions.json");
const {
  mentionDataSchema,
  mentionIncludesSchema,
} = require("./model/mentions-schema");
const { save } = require("./controller-mentions");
const DB = require("./service-db");

const { data, includes } = mentionTwitterResponse;

(async function test() {
  try {
    const db = await DB.create();
    // await db.createTable();

    const validData = await mentionDataSchema.validateAsync(data);
    const validIncludes = await mentionIncludesSchema.validateAsync(includes);
    // for (let i = 0; i < validData.length; i++) {

    // }
    try {
      const i = 3;
      const query = await save({}, validData[i], validIncludes.users[i]);
      console.log(query);
      db.getDb().serialize(() => {
        db.getDb().exec(query, (err) => {
          if (err) {
            console.log("ERROR WRITING TO DB");
            console.log(err);
          }
        });
        console.log(`TEST PASSED : ${i}`);
      });
    } catch (err) {
      console.log(`FAILED query generation for ${i}`);
      console.log(err);
    }
  } catch (err) {
    console.log("TEST FAILED");
    console.log(err);
  }
})();
