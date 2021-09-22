const { nanoid } = require("nanoid");
const { sequelize } = require("./service-db");
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

exports.save = async (models) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      for (let i = 0; i < models.length; i++) {
        const res = await models[i].save({ transaction });
      }
    });
  } catch (err) {
    console.log("ERROR :  coult not save mention in db");
    console.log(err);
  }
};
