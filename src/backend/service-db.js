const sqlite = require("sqlite3").verbose();
const path = require("path");
const { nanoid } = require("nanoid");

class DB {
  constructor() {}

  async init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(
        "data.db",
        sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE,
        (err, data) => {
          if (err) {
            console.log("Error creating database");
            reject("Could not create database");
          }
          console.log("Connected to db");
          resolve(this);
        }
      );
    });
  }
  static async create() {
    const db = new DB();
    await db.init();
    return db;
  }

  async createTable() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.exec(
          `
          BEGIN;
          
          CREATE TABLE  IF NOT EXISTS mentioned_tweets ( 
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            t_id varchar(25) UNIQUE, 
            t_created_at datetime,
            text varchar(500), 
            lang varchar(5),
            author_name varchar(25),
            t_conversation_id varchar(25),
            possibly_sensitive INTEGER COLLATE BINARY,
            author_id varchar(25),
            public_metric_id varchar(25)
          );

          CREATE TABLE IF NOT EXISTS author (
            id varchar(25) NOT NULL PRIMARY KEY,
            created_at datetime,
            updated_at datetime,
            t_id varchar(25) UNIQUE,
            t_created_at datetime,
            verified INTEGER COLLATE BINARY,
            name varchar(25),
            description VARCHAR(200),
            profile_image_url VARCHAR(100),
            location VARCHAR(25),
            url VARCHAR(100),
            username varchar(25)
          );

          CREATE TABLE IF NOT EXISTS public_metrics (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            retweet_count INTEGER DEFAULT 0,
            reply_count	INTEGER DEFAULT 0,
            like_count	INTEGER DEFAULT 0,
            quote_count	INTEGER DEFAULT 0
          );

          CREATE TABLE IF NOT EXISTS entity_mentions (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            mention_tweet_id varchar(25),
            start INTEGER,
            end	INTEGER,
            username VARCHAR(25),
            t_id VARCHAR(25)
          );

          CREATE TABLE IF NOT EXISTS entity_annotations (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            mention_tweet_id varchar(25),
            start INTEGER,
            end	INTEGER,
            probability INTEGER,
            type VARCHAR(25),
            normalized_text VARCHAR(25)
          );

          CREATE TABLE IF NOT EXISTS entity_urls (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            mention_tweet_id varchar(25),
            url VARCHAR(100),
            expanded_url VARCHAR(100),
            display_url VARCHAR(100),
            unwound_url VARCHAR(100)
          );

          CREATE TABLE IF NOT EXISTS entity_hashtag (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            mention_tweet_id varchar(25),
            start INTEGER,
            end	INTEGER,
            tag VARCHAR(50)
          );

          CREATE TABLE IF NOT EXISTS context_annotations (
            id varchar(25) NOT NULL PRIMARY KEY, 
            created_at datetime,
            updated_at datetime,
            mention_tweet_id varchar(25),
            domain_id INTEGER,
            domain_name varchar(25),
            domain_description varchar(200),
            entity_id INTEGER,
            entity_name varchar(25),
            entity_description varchar(200)
          );

          COMMIT;
          `,
          (err) => {
            if (err) {
              console.log(err);
              reject("Could not create tables");
            } else {
              console.log("Database Initialized");
              resolve(this);
            }
          }
        );
      });
    });
  }

  getDb() {
    return this.db;
  }

  save(tableName, obj) {}

  get(tableName, key, value) {}

  update(tableName, key, obj) {}
}

module.exports = DB;
