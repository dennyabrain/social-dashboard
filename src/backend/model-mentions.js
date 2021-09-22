const { nanoid } = require("nanoid");

class ModelMention {
  constructor(db) {
    this.db = db.getDb();
  }

  initializeFromTwitterResponse(mentionResFromTwitter) {
    try {
      const { data, user } = mentionResFromTwitter;
      //   console.log({ data, user });
      this.id = nanoid();
      this.twitterID = data.id;
      this.twitterCreatedAt = data.created_at;
      this.text = data.text;
      this.lang = data.lang;
      this.possiblySensitive = data.possibly_sensitive;
      this.conversationId = data.conversation_id;
      this.authorId = data.author_id;
      this.authorName = user ? user.username : "";

      this.metrics = data.public_metrics;
      this.entities = data.entities;
      this.author = user;
      this.contextAnnotations = data.context_annotations;
    } catch (err) {
      console.log(err);
      throw "Unrecognized Format for Mention Response from Twitter";
    }
  }

  getTweet() {
    return {
      id: this.id,
      twitter_id: this.twitterID,
      twitter_created_at: this.twitterCreatedAt,
      text: this.text,
      lang: this.lang,
      possibly_sensitive: this.possiblySensitive,
      conversation_id: this.conversationId,
      author_id: this.authorId,
      author_name: this.authorName,
    };
  }

  getAuthor() {
    return {
      ...this.author,
    };
  }

  getMetrics() {
    return { ...this.metrics };
  }

  getEntities() {
    return { ...this.entities };
  }

  getContextAnnotations() {
    return { ...this.contextAnnotations };
  }

  /*
    save tweet in mentioned tweet
    save author in authors
    save public_metrics in metrics
    now lets look at optional arguments
      save entities.mentions, entities.hashtags, entities.urls and entities.annotations
      save context_annotations
  */
  async save() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(
          `INSERT INTO tweets VALUES("${this.id}", "${this.publicId}", "${this.text}", "${this.authorId}", "${this.createdAt}")`,
          [],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log(`Saved Mention Id ${this.id}`);
              resolve(this);
            }
          }
        );
      });
    });
  }

  async get(id) {}

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all(`SELECT * FROM tweets`, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  async getByTweetId(id) {}

  async getByAuthorId(id) {}

  async getMentionsById(id) {}

  async getHashTagsById(id) {}

  async getURLsById(id) {}

  async getAnnotationsById(id) {}

  async getContextAnnotationsById(id) {}
}

exports.ModelMention = ModelMention;
