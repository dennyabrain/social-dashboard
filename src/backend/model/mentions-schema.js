const Joi = require("joi");

const DB_ID_LENGTH = 50;
const DB_URL_LENGTH = 100;
const TWITTER_USER_NAME_LENGTH = 100;
const TWITTER_DESCRIPTION_LENGTH = 160;

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
  description: Joi.string().max(160).allow(""),
  profile_image_url: Joi.string().max(DB_URL_LENGTH),
  location: Joi.string(),
  url: Joi.string().max(DB_URL_LENGTH).allow(""),
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
  type: Joi.string(),
  normalized_text: Joi.string(),
});

const entityURLSchema = Joi.object({
  start: Joi.number(),
  end: Joi.number(),
  url: Joi.string(),
  expanded_url: Joi.string(),
  display_url: Joi.string(),
  unwound_url: Joi.string(),
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
  id: Joi.string().max(DB_ID_LENGTH).default("NULL"),
  name: Joi.string().default("NULL"),
  description: Joi.string().optional().default("NULL"),
}).default({ id: "NULL", name: "NULL", description: "NULL" });

const contextAnnotationEntitySchema = Joi.object({
  id: Joi.string().max(DB_ID_LENGTH).default("NULL"),
  name: Joi.string().default("NULL"),
  description: Joi.string().optional().default("NULL"),
}).default({ id: "NULL", name: "NULL", description: "NULL" });

const contexAnnotationSchema = Joi.object({
  domain: contexAnnotationDomainSchema,
  entity: contextAnnotationEntitySchema,
});

exports.mentionDataSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    created_at: Joi.date().iso(),
    text: Joi.string().max(500),
    author_id: Joi.string().max(DB_ID_LENGTH),
    lang: Joi.string().max(2),
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
