const { nanoid } = require("nanoid");
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
exports.getMentionsByUserId = async (userId) => {
  const { data, includes, meta, errors } = await client.get(
    `users/${userId}/mentions`,
    {
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
    }
  );

  if (errors) {
    console.log("----");
    console.log("Errors:", errors);
    throw "Could not get Mentions";
  }

  return { data, includes };
};

exports.save = async (db, data, user) => {
  let query = `BEGIN;`;

  const currentTime = new Date();
  const mentionedTweetId = nanoid();
  const authorId = nanoid();
  const publicMetricId = nanoid();

  const { public_metrics, entities, context_annotations } = data;

  query += `\n\nINSERT INTO mentioned_tweets VALUES(
      "${mentionedTweetId}",
      "${currentTime}",
      "${currentTime}",
      "${data.id}",
      "${data.created_at}",
      "${data.text.replaceAll(`"`, `""`).replaceAll(`'`, `''`)}",
      "${data.lang}",
      "${user.username}",
      "${data.conversation_id}",
      "${data.possibly_sensitive}",
      "${data.author_id}",
      "${publicMetricId}"
    );`;

  query += `\n\nINSERT INTO author VALUES(
      "${authorId}",
      "${currentTime}",
      "${currentTime}",
      "${user.id}",
      "${user.created_at}",
      "${user.verified}",
      "${user.name}",
      "${user.description}",
      "${user.profile_image_url}",
      "${user.location}",
      "${user.url}",
      "${user.username}"
    );`;

  query += `\n\nINSERT INTO public_metrics VALUES(
      "${authorId}",
      "${currentTime}",
      "${currentTime}",
      "${public_metrics.retweet_count}",
      "${public_metrics.reply_count}",
      "${public_metrics.like_count}",
      "${public_metrics.quote_count}"
    );`;

  // save available entities
  for (const key in entities) {
    entities[key].map((entity) => {
      if (key === "mentions") {
        query += `\n\nINSERT INTO entity_mentions VALUES(
            "${nanoid()}",
            "${currentTime}",
            "${currentTime}",
            "${mentionedTweetId}",
            "${entity.start}",
            "${entity.end}",
            "${entity.username}",
            "${entity.id}"
          );`;
      } else if (key === "annotations") {
        query += `\n\nINSERT INTO entity_annotations VALUES(
            "${nanoid()}",
            "${currentTime}",
            "${currentTime}",
            "${mentionedTweetId}",
            "${entity.start}",
            "${entity.end}",
            "${entity.probability}",
            "${entity.type}",
            "${entity.normalized_text}"
          );`;
      } else if (key === "urls") {
        query += `INSERT INTO entity_urls VALUES(
            "${nanoid()}",
            "${currentTime}",
            "${currentTime}",
            "${mentionedTweetId}",
            "${entity.url}",
            "${entity.expanded_url}",
            "${entity.display_url}",
            "${entity.unwound_url}"
          );`;
      } else if (key === "hashtags") {
        query += `INSERT INTO entity_urls VALUES(
            "${nanoid()}",
            "${currentTime}",
            "${currentTime}",
            "${mentionedTweetId}",
            "${entity.start}",
            "${entity.end}",
            "${entity.tag}"
          );`;
      } else {
        throw "Unrecognized Entity";
      }
    });
  }

  if (context_annotations) {
    context_annotations.map((context_annotation) => {
      query += `\n\nINSERT INTO context_annotations VALUES(
        "${nanoid()}",
        "${currentTime}",
        "${currentTime}",
        "${mentionedTweetId}",
        "${context_annotation.domain.id}",
        "${context_annotation.domain.name}",
        "${context_annotation.entity.id}",
        "${context_annotation.entity.name}",
        "${context_annotation.entity.description}",
      );`;
    });
  }

  query += `COMMIT;`;

  return query;
};
