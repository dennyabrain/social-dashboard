const {
  MentionedTweet,
  Author,
  PublicMetric,
  ContextAnnotation,
  ContextAnnotationDomain,
  ContextAnnotationEntity,
  Entity,
  EntityURL,
  EntityAnnotation,
  EntityHashtag,
  EntityMention,
  Error,
} = require("./sequelize/models");

exports.createMentionFromFlattenedTwitterResponsePayload = (payload) => {
  return MentionedTweet.create(payload, {
    include: [
      {
        model: Author,
      },
      {
        model: PublicMetric,
      },
      {
        model: Entity,
        include: [
          {
            model: EntityAnnotation,
          },
          {
            model: EntityHashtag,
          },
          {
            model: EntityMention,
          },
          {
            model: EntityURL,
          },
        ],
      },
      {
        model: ContextAnnotation,
        include: [
          {
            model: ContextAnnotationDomain,
          },
          {
            model: ContextAnnotationEntity,
          },
        ],
      },
    ],
  });
};
