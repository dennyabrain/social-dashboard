const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});
const { create_table_on_startup } = require("./config");

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
  },
  { sequelize, modelName: "mentionedTweet" }
);

class Author extends Model {}

Author.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    tId: DataTypes.STRING,
    tCreatedAt: DataTypes.DATE,
    verified: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    profileImageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    username: DataTypes.STRING,
    protected: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "author" }
);

class PublicMetrics extends Model {}

PublicMetrics.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    retweetCount: DataTypes.INTEGER,
    replyCount: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    quoteCount: DataTypes.INTEGER,
  },
  { sequelize, modelName: "publicMetric" }
);

MentionedTweets.Author = MentionedTweets.belongsTo(Author);
MentionedTweets.PublicMetrics = MentionedTweets.belongsTo(PublicMetrics);

class EntityMention extends Model {}

EntityMention.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    start: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    username: DataTypes.STRING,
    tID: DataTypes.STRING,
  },
  { sequelize, modelName: "entityMention" }
);

class EntityAnnotation extends Model {}

EntityAnnotation.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    start: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    probability: DataTypes.INTEGER,
    type: DataTypes.STRING,
    normalizedText: DataTypes.STRING,
  },
  { sequelize, modelName: "entityAnnotation" }
);

class EntityURL extends Model {}

EntityURL.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    url: DataTypes.STRING,
    expandedURL: DataTypes.STRING,
    displayURL: DataTypes.STRING,
    unwoundURL: DataTypes.STRING,
  },
  { sequelize, modelName: "entityURL" }
);

class EntityHashtag extends Model {}

EntityHashtag.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    start: DataTypes.INTEGER,
    end: DataTypes.INTEGER,
    tag: DataTypes.STRING,
  },
  { sequelize, modelName: "entityHashtag" }
);

class ContextAnnotation extends Model {}

ContextAnnotation.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    domainId: DataTypes.INTEGER,
    domainName: DataTypes.STRING,
    domainDescription: DataTypes.STRING,
    entityId: DataTypes.INTEGER,
    entityName: DataTypes.STRING,
    entityDescription: DataTypes.STRING,
  },
  { sequelize, modelName: "contextAnnotation" }
);
MentionedTweets.hasOne(EntityMention);
MentionedTweets.hasOne(EntityAnnotation);
MentionedTweets.hasOne(EntityURL);
MentionedTweets.EntityHashtag = MentionedTweets.hasOne(EntityHashtag);
MentionedTweets.hasOne(ContextAnnotation);

const setup = async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  await sequelize.sync({ force: true });
};

module.exports = {
  sequelize,
  setup,
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityMention,
  EntityAnnotation,
  EntityURL,
  EntityHashtag,
  ContextAnnotation,
};
