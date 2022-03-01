const { nanoid } = require("nanoid");
const {
  sequelize,
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityHashtag,
  ContextAnnotation,
  EntityAnnotation,
  EntityMention,
  EntityURL,
} = require("./service-db");
const { client } = require("./service-twitter");

exports.getUserByName = async (username) => {
  const { data, meta, errors } = await client.get(
    `users/by/username/${username}`
  );

  if (errors) {
    console.log("Errors:", errors);
    throw `Could not get UserID ${errors[0].detail}`;
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
const getMentionsByUserId = async (userId, paginationToken) => {
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

exports.getMentionsByUserId = getMentionsByUserId;

async function searchTweetsMentioning(userHandle, paginationToken) {
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
    query: `@${userHandle} -is:retweet`,
    since_id: "1493278474617831425",
  };
  if (paginationToken) {
    payload.pagination_token = paginationToken;
  }
  const { data, includes, meta, errors } = await client.get(
    `tweets/search/all`,
    payload
  );

  if (errors) {
    console.log("----");
    console.log("Errors:", errors);
    throw "Could not get Mentions";
  }

  return { data, includes, meta };
}

exports.searchTweetsMentioning = searchTweetsMentioning;

exports.searchAllTweetsMentioning = async function* (userHandle) {
  const { data, includes, meta } = await searchTweetsMentioning(userHandle);
  yield { data, includes, meta };
  let { next_token } = meta;
  while (next_token) {
    const { data, includes, meta } = await searchTweetsMentioning(
      userHandle,
      next_token
    );
    next_token = meta.next_token;
    yield { data, includes, meta };
  }
};

exports.getAllMentionsByUserId = async function* (userId) {
  const { data, includes, meta } = await getMentionsByUserId(userId);
  yield data;
  let { next_token } = meta;
  while (next_token) {
    const { data, includes, meta } = await getMentionsByUserId(
      userId,
      next_token
    );
    next_token = meta.next_token;
    yield data;
  }
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

exports.getTweetById = async (id) => {
  const tweet = await MentionedTweets.findOne({
    where: {
      id,
    },
    include: [Author, PublicMetrics],
  });
  const entityHashtag = await EntityHashtag.findAndCountAll({
    limit: 20,
    where: { mentionedTweetId: tweet.id },
  });
  const entityAnnotations = await EntityAnnotation.findAndCountAll({
    limit: 20,
    where: { mentionedTweetId: tweet.id },
  });
  const entityMentions = await EntityMention.findAndCountAll({
    limit: 20,
    where: { mentionedTweetId: tweet.id },
  });
  const entityURL = await EntityURL.findAndCountAll({
    limit: 20,
    where: { mentionedTweetId: tweet.id },
  });
  const contextAnnotations = await ContextAnnotation.findAndCountAll({
    limit: 20,
    where: { mentionedTweetId: tweet.id },
  });

  return {
    tweet: tweet.dataValues,
    entityHashtag: entityHashtag.rows,
    entityAnnotations: entityAnnotations.rows,
    entityMentions: entityMentions.rows,
    entityURL: entityURL.rows,
    contextAnnotations: contextAnnotations.rows,
  };
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
