const { nanoid } = require("nanoid");
const {
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityMention,
  EntityAnnotation,
  EntityURL,
  EntityHashtag,
  ContextAnnotation,
} = require("./service-db");

const adapterTwitterMentionToDbMention = async (data, user) => {
  const mentionTweetId = nanoid();
  const authorId = nanoid();
  const publicMetricId = nanoid();
  const dbModels = [];

  const author = await Author.create({
    id: authorId,
    tId: user.id,
    tCreatedAt: user.created_at,
    verified: user.verified,
    name: user.name,
    description: user.description,
    profileImageUrl: user.profile_image_url,
    location: user.location,
    url: user.url,
    username: user.username,
    protected: user.protected,
  });

  const { public_metrics } = data;
  const publicMetrics = await PublicMetrics.create({
    id: publicMetricId,
    retweetCount: public_metrics.retweet_count,
    replyCount: public_metrics.reply_count,
    likeCount: public_metrics.like_count,
    quoteCount: public_metrics.quote_count,
  });

  const mentionedTweet = await MentionedTweets.create({
    id: mentionTweetId,
    tId: data.id,
    tCreatedAt: data.created_at,
    text: data.text,
    lang: data.lang,
    authorName: user.username,
    tConversationId: data.conversation_id,
    possiblySensitive: data.possibly_sensitive,
    authorId: author.id,
    publicMetricId: publicMetrics.id,
  });

  const { entities } = data;
  const { mentions, annotations, urls, hashtags } = entities;
  if (mentions) {
    for (let i = 0; i < mentions.length; i++) {
      let entityMentionModel = await EntityMention.create({
        id: nanoid(),
        mentionedTweetId: mentionedTweet.id,
        start: mentions[i].start,
        end: mentions[i].end,
        username: mentions[i].username,
        tID: mentions[i].id,
      });
    }
  }
  if (annotations) {
    for (let i = 0; i < annotations.length; i++) {
      let entityAnnotationModel = await EntityAnnotation.create({
        id: nanoid(),
        mentionedTweetId: mentionedTweet.id,
        start: annotations[i].start,
        end: annotations[i].end,
        probability: annotations[i].probability,
        type: annotations[i].type,
        normalized_text: annotations[i].normalized_text,
      });
    }
  }
  if (urls) {
    for (let i = 0; i < urls.length; i++) {
      let entityURLModel = await EntityURL.create({
        id: nanoid(),
        mentionedTweetId: mentionedTweet.id,
        url: urls[i].url,
        expandedURL: urls[i].expanded_url,
        displayURL: urls[i].display_url,
        unwoundURL: urls[i].unwound_url,
      });
    }
  }
  if (hashtags) {
    for (let i = 0; i < hashtags.length; i++) {
      let entityHashtagModel = await EntityHashtag.create({
        id: nanoid(),
        mentionedTweetId: mentionedTweet.id,
        start: hashtags[i].start,
        end: hashtags[i].end,
        tag: hashtags[i].tag,
      });
    }
  }

  const { context_annotations } = data;
  if (context_annotations) {
    for (let i = 0; i < context_annotations.length; i++) {
      let contextAnnotations = await ContextAnnotation.create({
        id: nanoid(),
        mentionedTweetId: mentionedTweet.id,
        domainId: context_annotations[i].domain.id,
        domainName: context_annotations[i].domain.name,
        domainDescription: context_annotations[i].domain.description,
        entityId: context_annotations[i].entity.id,
        entityName: context_annotations[i].entity.name,
        entityDescription: context_annotations[i].entity.description,
      });
    }
  }
};

module.exports = {
  adapterTwitterMentionToDbMention,
};
