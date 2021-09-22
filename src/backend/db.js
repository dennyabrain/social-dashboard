const { nanoid } = require("nanoid");
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    class MentionedTweets extends Model {}

    MentionedTweets.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        tId: DataTypes.STRING,
        tCreatedAt: DataTypes.DATE,
        text: DataTypes.STRING,
        lang: DataTypes.STRING,
        authorName: DataTypes.STRING,
        tConversationId: DataTypes.STRING,
        possiblySensitive: DataTypes.BOOLEAN,
        authorId: DataTypes.STRING,
        publicMetricId: DataTypes.STRING,
      },
      { sequelize, modelName: "mentioned_tweet" }
    );

    // await MentionedTweets.sync({ force: true });

    // const mentionedTweet = await MentionedTweets.create({
    //   id: nanoid(),
    //   tId: "1439991667554013185",
    //   tCreatedAt: new Date().toISOString(),
    //   text: "@bankofbaroda  Worst Bank of my life but I don't have any other option. \nthis twitte is just to remind you in future \"you don't help me when I needed\" \neven I maintain current and savings accounts at BoB.",
    //   lang: "en",
    //   authorName: "pankaj1233",
    //   tConversationId: "1439839240527962112",
    //   possiblySensitive: false,
    //   authorId: "2594273179",
    //   publicMetricId: nanoid(),
    // });

    const tweets = await MentionedTweets.findAll();
    console.log(tweets[0].dataValues);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
