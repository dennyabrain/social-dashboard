const adapterTwitterToSequelize = (endpoint, twitterPayload) => {
  switch (endpoint) {
    case "/search":
      // console.log(twitterPayload);
      const { author, entities, context_annotations, public_metrics } =
        twitterPayload;

      const authorId = author.id;
      delete author["id"];

      const createPayload = {
        eTwitterId: twitterPayload.id,
        eTwitterCreatedAt: twitterPayload.created_at,
        eTwitterConversationId: twitterPayload.conversation_id,
        text: twitterPayload.text,
        lang: twitterPayload.lang,
        possiblySensitive: twitterPayload.possibly_sensitive,
        Author: {
          ...author,
          eTwitterId: authorId,
          eTwitterCreatedAt: author.created_at,
          profileImageUrl: author.profile_image_url,
        },
        PublicMetric: (() => {
          if (!public_metrics) {
            return undefined;
          } else {
            const newPublicMetrics = {
              ...public_metrics,
              retweetCount: public_metrics.retweet_count,
              replyCount: public_metrics.reply_count,
              likeCount: public_metrics.like_count,
              quoteCount: public_metrics.quote_count,
            };
            delete public_metrics.retweet_count,
              delete public_metrics.reply_count,
              delete public_metrics.like_count,
              delete public_metrics.quote_count;

            return newPublicMetrics;
          }
        })(),
        Entity: (() => {
          if (!entities) {
            return undefined;
          } else {
            return {
              EntityAnnotations: (() => {
                const { annotations } = entities;
                if (!annotations) {
                  return undefined;
                } else {
                  return annotations.map((annotation) => {
                    const newAnnotation = {
                      ...annotation,
                      normalizedText: annotation.normalized_text,
                    };
                    delete newAnnotation.normalized_text;
                    return newAnnotation;
                  });
                }
              })(),
              EntityHashtags: (() => {
                const { hashtags } = entities;
                if (!hashtags) {
                  return undefined;
                } else {
                  return hashtags.map((hashtag) => {
                    return hashtag;
                  });
                }
              })(),
              EntityMentions: (() => {
                const { mentions } = entities;
                if (!mentions) {
                  return undefined;
                } else {
                  return mentions.map((mention) => {
                    const newMention = {
                      ...mention,
                      eTwitterId: mention.id,
                    };
                    delete newMention.id;
                    return newMention;
                  });
                }
              })(),
              EntityURLs: (() => {
                const { urls } = entities;
                if (!urls) {
                  return undefined;
                } else {
                  return urls.map((url) => {
                    return {
                      ...url,
                      expandedURL: url.expanded_url,
                      displayURL: url.display_url,
                      unwoundURL: url.unwound_url,
                    };
                  });
                }
              })(),
            };
          }
        })(),
        ContextAnnotations: () => {
          if (!context_annotations) {
            return undefined;
          } else {
            return context_annotations.map((contextAnnotation) => {
              return {
                ContextAnnotationDomain: (() => {
                  if (!contextAnnotation.domain) {
                    return undefined;
                  } else {
                    const newDomain = {
                      ...contextAnnotation.domain,
                      eId: contextAnnotation.domain.id,
                    };
                    delete newDomain.id;
                    return newDomain;
                  }
                })(),
                ContextAnnotationEntity: (() => {
                  if (!contextAnnotation.entity) {
                    return undefined;
                  } else {
                    const newEntity = {
                      ...contextAnnotation.entity,
                      eId: contextAnnotation.entity.id,
                    };
                    delete newEntity.id;
                    return newEntity;
                  }
                })(),
              };
            });
          }
        },
      };

      return createPayload;
    default:
      return {};
  }
};

/**
 * The expansions sent by twitter are not part of the tweet payload. This
 * function combines the two object into one to make it more convinient for any
 * subsequent operations
 */
const flattenMentionPayload = (payload) => {
  let authorById = {};

  payload.validIncludes.users.map((i) => {
    authorById[i.id] = i;
  });
  // console.log(authorById);
  const flattenedData = payload.validData.map((i) => {
    // console.log(i);
    return {
      ...i,
      author: authorById[i.author_id],
    };
  });
  return flattenedData;
};

module.exports = {
  adapterTwitterToSequelize,
  flattenMentionPayload,
};
