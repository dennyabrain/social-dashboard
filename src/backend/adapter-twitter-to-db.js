const { nanoid } = require("nanoid");
const {
  MentionedTweets,
  Author,
  PublicMetrics,
  EntityMention,
  EntityAnnotation,
  EntityURL,
  EntityHashtag,
} = require("./service-db");

const adapterTwitterMentionToDbMention = (data, user) => {
  const mentionTweetId = nanoid();
  const authorId = nanoid();
  const publicMetricId = nanoid();
  const dbModels = [];

  console.log(data);

  const mentionedTweet = MentionedTweets.build({
    id: mentionTweetId,
    tId: data.id,
    tCreatedAt: data.created_at,
    text: data.text,
    lang: data.lang,
    authorName: user.username,
    tConversationId: data.conversation_id,
    possiblySensitive: data.possibly_sensitive,
    authorId: authorId,
    publicMetricId: publicMetricId,
  });
  dbModels.push(mentionedTweet);

  const author = Author.build({
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
  dbModels.push(author);

  const { public_metrics } = data;
  const publicMetrics = PublicMetrics.build({
    id: publicMetricId,
    retweetCount: public_metrics.retweet_count,
    replyCount: public_metrics.reply_count,
    likeCount: public_metrics.like_count,
    quoteCount: public_metrics.quote_count,
  });
  dbModels.push(publicMetrics);

  const { entities } = data;
  const { mentions, annotations, urls, hashtags } = entities;
  if (mentions) {
    for (let i = 0; i < mentions.length; i++) {
      let entityMentionModel = EntityMention.build({
        id: nanoid(),
        mentionTweetId,
        start: mentions[i].start,
        end: mentions[i].end,
        username: mentions[i].username,
        tID: mentions[i].id,
      });
      dbModels.push(entityMentionModel);
    }
  }
  if (annotations) {
    for (let i = 0; i < annotations.length; i++) {
      let entityAnnotationModel = EntityAnnotation.build({
        id: nanoid(),
        mentionTweetId,
        start: annotations[i].start,
        end: annotations[i].end,
        probability: annotations[i].probability,
        type: annotations[i].type,
        normalized_text: annotations[i].normalized_text,
      });
      dbModels.push(entityAnnotationModel);
    }
  }
  if (urls) {
    for (let i = 0; i < urls.length; i++) {
      let entityURLModel = EntityURL.build({
        id: nanoid(),
        mentionTweetId,
        url: urls[i].url,
        expandedUrl: urls[i].expanded_url,
        displayUrl: urls[i].display_url,
        unwound_url: urls[i].unwound_url,
      });
      dbModels.push(entityURLModel);
    }
  }
  if (hashtags) {
    for (let i = 0; i < hashtags.length; i++) {
      let entityHashtagModel = EntityHashtag.build({
        id: nanoid(),
        mentionTweetId,
        start: hashtags[i].start,
        end: hashtags[i].end,
        tag: hashtags[i].tag,
      });
      dbModels.push(entityHashtagModel);
    }
  }
  return dbModels;
};

module.exports = {
  adapterTwitterMentionToDbMention,
};
