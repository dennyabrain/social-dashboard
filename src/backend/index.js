const dotenv = require("dotenv");
dotenv.config();
const { getUserByName, getMentionsByUserId } = require("./controller-mentions");
const { ModelMention } = require("./model-mentions");
const { name, age } = require("./service-db");
const { writeFile } = require("fs/promises");
const { config } = require("./config");

async function test() {
  // db.save('mentions', {text: 'asdfasdf'})
  // const mentions = await getMentionsByUserId("4650859756");
  // await writeFile("mentions.json", JSON.stringify(mentions, undefined, 2));

  if (config.create_table_on_startup) {
    await setup();
  }

  console.log({ name, age });
  // for (let i = 0; i < mentions.data.length; i++) {
  //   try {
  //     const mention = new ModelMention(db);
  //     mention.initializeFromTwitterResponse(
  //       { data: mentions.data[i], user: mentions.includes.users[i] },
  //       db
  //     );
  //     console.log(mention.getAuthor());
  //   } catch (err) {
  //     console.log("Could not create model mention");
  //     console.log(err);
  //   }
  // }
}

try {
  test();
} catch (err) {
  console.log(err);
}
