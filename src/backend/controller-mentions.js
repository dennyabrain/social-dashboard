const { nanoid } = require("nanoid");
const {
  sequelize,
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityHashtag,
  ContextAnnotation,
} = require("./service-db");
const { client } = require("./service-twitter");

exports.getUserByName = async (username) => {
  const { data, meta, errors } = await client.get(
    `users/by/username/${username}`
  );

  if (errors) {
    console.log("Errors:", errors);
    throw "Could not get UserID";
  }

  if (data) {
    return data;
  }
};

/**
 *
 *  const mentions = await getMentionsByUserId("4650859756");
 *  console.log(mentions[0]);
 */
exports.getMentionsByUserId = async (userId, paginationToken) => {
  const payload = {
    tweet: {
      fields: [
        "created_at",
        "entities",
        "author_id",
        "conversation_id",
        "lang",
        "public_metrics",
        "possibly_sensitive",
        "context_annotations",
      ],
    },
    expansions: "author_id",
    user: {
      fields:
        "created_at,description,id,location,name,profile_image_url,protected,url,username,verified",
    },
    max_results: 100,
  };
  if (paginationToken) {
    payload.pagination_token = paginationToken;
  }
  const { data, includes, meta, errors } = await client.get(
    `users/${userId}/mentions`,
    payload
  );

  if (errors) {
    console.log("----");
    console.log("Errors:", errors);
    throw "Could not get Mentions";
  }

  console.log(meta);

  return { data, includes, meta };
};

exports.save = async (models) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      for (let i = 0; i < models.length; i++) {
        const res = await models[i].save({ transaction });
      }
    });
    console.log("SUCCESS : saved mention");
    console.log(result);
  } catch (err) {
    console.log("ERROR :  coult not save mention in db");
    console.log(err);
  }
};

// if condensed is true, only send tweet, author, public metrics. else send all the associated metadata
exports.getTweets = async (pageNum, condensed) => {
  if (condensed) {
    return MentionedTweets.findAndCountAll({ offset: pageNum * 5, limit: 5 });
  } else {
    return MentionedTweets.findAndCountAll({
      offset: pageNum * 5,
      limit: 5,
      include: [Author, PublicMetrics],
    });
  }
};

exports.getTweetsByLanguage = async (pageNum, lang) => {
  return MentionedTweets.findAndCountAll({
    offset: pageNum * 5,
    limit: 5,
    where: { lang },
  });
};

// exports.getTweetsByLocation = async (pageNum, location) => {
//   const responseRows = [];
//   const authorDbRes = await Author.findAndCountAll({
//     offset: pageNum * 5,
//     limit: 5,
//     where: { location },
//   });
//   console.log("FOUND authors");

//   const { rows: authors } = authorDbRes;

//   // console.log(authors);

//   for (let i = 0; i < authors.length; i++) {
//     const authorId = authors[i].dataValues.id;
//     const tweets = await MentionedTweets.findAll({
//       offset: pageNum * 5,
//       limit: 5,
//       where: {
//         authorId,
//       },
//     });
//     console.log("FOUND tweets");
//     console.log(tweets);
//   }
//   return { rows: responseRows };
// };

exports.getTweetsByHashtag = async (pageNum, tag) => {
  const tweetRows = [];
  const { count, rows } = await EntityHashtag.findAndCountAll({
    offset: pageNum * 5,
    limit: 5,
    where: { tag },
  });

  // console.log(x);

  for (let i = 0; i < rows.length; i++) {
    const tweet = await MentionedTweets.findOne({
      where: {
        id: rows[i].dataValues.mentionedTweetId,
      },
    });
    console.log(tweet);
    tweetRows.push(tweet);
  }
  return { rows: tweetRows };
};

exports.getTweetsByContextAnnotation = async (pageNum, entity) => {
  const tweetRows = [];
  const { count, rows } = await ContextAnnotation.findAndCountAll({
    offset: pageNum * 10,
    limit: 10,
    where: { entityName: entity },
  });

  for (let i = 0; i < rows.length; i++) {
    const tweet = await MentionedTweets.findOne({
      where: {
        id: rows[i].dataValues.mentionedTweetId,
      },
    });
    console.log(tweet);
    tweetRows.push(tweet);
  }
  return { count, rows: tweetRows };
};
