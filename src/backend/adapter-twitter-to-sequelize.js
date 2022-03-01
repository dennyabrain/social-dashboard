const adapterTwitterToSequelize = (endpoint, twitterPayload) => {
  switch (endpoint) {
    case "/search":
      // console.log(twitterPayload);
      const { author, entities, context_annotations } = twitterPayload;

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
        // Entity: !entities
        //   ? undefined
        //   : {
        //       urls: !entities.urls
        //         ? undefined
        //         : twitterPayload.entities.urls.map((url) => {
        //             return {
        //               ...url,
        //               expandedURL: url.expanded_url,
        //               displayURL: url.display_url,
        //               unwoundURL: url.unwound_url,
        //             };
        //           }),
        //       annotations: !entities.annotations
        //         ? undefined
        //         : twitterPayload.entities.annotations.map((annotation) => {
        //             return {
        //               ...annotation,
        //               normalizedText: annotation.normalized_text,
        //             };
        //           }),
        //       hashtags: !entities.hashtags ? undefined : entities.hashtags,
        //       mentions: !entities.mentions
        //         ? undefined
        //         : entities.mentions.map((mention) => {
        //             return {
        //               ...mention,
        //               eTwitterId: mention.id,
        //             };
        //           }),
        //     },

        ContextAnnotations: context_annotations.map((contextAnnotation) => {
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
        }),
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
