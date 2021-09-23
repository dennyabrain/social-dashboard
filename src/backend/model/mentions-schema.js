const Joi = require("joi");

const DB_ID_LENGTH = 50;
const DB_URL_LENGTH = 200;
const TWITTER_USER_NAME_LENGTH = 100;
const TWITTER_DESCRIPTION_LENGTH = 500;

/*
todo schema is actually
data and includes 
    most thigns are in the data one
    user or author is in includes
*/

const userSchema = Joi.object({
  id: Joi.string().max(DB_ID_LENGTH).required(),
  verified: Joi.boolean(),
  name: Joi.string().max(TWITTER_USER_NAME_LENGTH),
  description: Joi.string()
    .max(TWITTER_DESCRIPTION_LENGTH)
    .allow("")
    .default("NA"),
  profile_image_url: Joi.string().max(DB_URL_LENGTH),
  location: Joi.string().default("NA"),
  url: Joi.string().max(DB_URL_LENGTH).allow("").default("NA"),
  protected: Joi.boolean(),
  username: Joi.string().max(50).required(),
  created_at: Joi.date().iso(),
});

const schemaPublicMetric = Joi.object({
  retweet_count: Joi.number(),
  reply_count: Joi.number(),
  like_count: Joi.number(),
  quote_count: Joi.number(),
});

const entityMentionSchema = Joi.object({
  start: Joi.number(),
  end: Joi.number(),
  username: Joi.string(),
  id: Joi.string().max(DB_ID_LENGTH),
});

const entityAnnotationSchema = Joi.object({
  start: Joi.number(),
  end: Joi.number(),
  probability: Joi.number().precision(3),
  type: Joi.string().allow("").default("NA"),
  normalized_text: Joi.string().allow("").default("NA"),
});

const entityURLSchema = Joi.object({
  start: Joi.number(),
  end: Joi.number(),
  url: Joi.string(),
  expanded_url: Joi.string().allow("").default("NA"),
  display_url: Joi.string().allow("").default("NA"),
  unwound_url: Joi.string().allow("").default("NA"),
});

const entityHashtagSchema = Joi.object({
  start: Joi.number(),
  end: Joi.number(),
  tag: Joi.string(),
});

const entitiesSchema = Joi.object({
  mentions: Joi.array().items(entityMentionSchema),
  annotations: Joi.array().items(entityAnnotationSchema),
  urls: Joi.array().items(entityURLSchema),
  hashtags: Joi.array().items(entityHashtagSchema),
});

const contexAnnotationDomainSchema = Joi.object({
  id: Joi.string().max(DB_ID_LENGTH).default("NA"),
  name: Joi.string().allow("").default("NA"),
  description: Joi.string().optional().allow("").default("NA"),
}).default({ id: "NA", name: "NA", description: "NA" });

const contextAnnotationEntitySchema = Joi.object({
  id: Joi.string().max(DB_ID_LENGTH).default("NA"),
  name: Joi.string().allow("").default("NA"),
  description: Joi.string().optional().allow("").default("NA"),
}).default({ id: "NA", name: "NA", description: "NA" });

const contexAnnotationSchema = Joi.object({
  domain: contexAnnotationDomainSchema,
  entity: contextAnnotationEntitySchema,
});

exports.mentionDataSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    created_at: Joi.date().iso(),
    text: Joi.string().max(1000),
    author_id: Joi.string().max(DB_ID_LENGTH),
    lang: Joi.string().max(10),
    possibly_sensitive: Joi.boolean(),
    conversation_id: Joi.string().max(25),
    public_metrics: schemaPublicMetric,
    entities: entitiesSchema,
    context_annotations: Joi.array().items(contexAnnotationSchema),
  })
);

exports.mentionIncludesSchema = Joi.object({
  users: Joi.array().items(userSchema),
});
