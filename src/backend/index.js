const dotenv = require("dotenv");
dotenv.config();
const { getUserByName, getMentionsByUserId } = require("./controller-mentions");
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
  // db.save('mentions', {text: 'asdfasdf'})
  // const mentions = await getMentionsByUserId("4650859756");
  // await writeFile("mentions.json", JSON.stringify(mentions, undefined, 2));

  if (config.create_table_on_startup) {
    await setup();
  }

  mentionedTweetId = nanoid();
  authorId = nanoid();
  publicMetricId = nanoid();
  const mentionedTweet = await MentionedTweets.create(
    {
      id: mentionedTweetId,
      tId: "21312321",
      tCreatedAt: new Date().toISOString(),
      text: "test tweet",
      lang: "hi",
      authorName: "Denny",
      tConversationId: "12312321321312",
      possiblySensitive: false,
      author: {
        id: authorId,
        tId: "123213123",
        tCreatedAt: new Date().toISOString(),
        verified: false,
        name: "Denny",
        description: "desc",
        profileImageUrl: "https://asdfas.asdfasdf.com",
        location: "Rajasthan",
        url: "https://asdf.asdfad.com",
        username: "pkv",
        protected: false,
      },
      publicMetric: {
        id: publicMetricId,
        retweetCount: 12,
        replyCount: 23,
        likeCount: 12,
        quoteCount: 2,
      },
    },
    {
      include: [
        {
          association: MentionedTweets.Author,
        },
        {
          association: MentionedTweets.PublicMetrics,
        },
        {
          include: [MentionedTweets.EntityHashtag],
        },
      ],
    }
  );
  // // const author = Author.build({});
  // // const publicMetrics = PublicMetrics.build({});

  // // await mentionedTweet.setAuthor(author);
  // // await mentionedTweet.setPublicMetric(publicMetrics);

  // await mentionedTweet.save();
  // await author.save();
  // await publicMetrics.save();

  // MentionedTweets, Author, PublicMetrics, EntityURL;

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
