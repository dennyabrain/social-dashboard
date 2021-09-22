# To discuss

- Many handles have been deleted since - CorporationBan2
- Review all the data that needs to be stored
- What is a tweet's length
  eg : @bankofbaroda @Swamy39 @minmsme @PIBIndiaMSME @RBI @BankofBarodaCEO @TheOfficialSBI @UnionBankTweets Appreciate your assurance.\nYr social media team approached me over call too.\nLet’s see how honest u &amp; yr commitment,process &amp; procedure.\nSurprisingly other #banks preferred to keep mum.\nआखें बंद कर लेने से पाप नहीं धुला करते।\n@AxisBank \n@HDFC_Bank \n@ICICIBank_Care \n@canarabank https://t.co/RLGbnqdSb1
  around 480 characters
  tweet id : 1439987003630575616

# TODO

- [ ] script to initialize table

# Snippets

```sql
INSERT INTO mentioned_tweets VALUES("123125", "2021-09-21T06:56:01.898Z", "2021-09-21T06:56:01.898Z", "123123220", "2021-09-21T06:56:01.898Z", "tweet text","1232", "123213");
INSERT INTO mentioned_tweets VALUES("123126", "2021-09-21T06:56:01.898Z", "2021-09-21T06:56:01.898Z", "123123221", "2021-09-21T06:56:01.898Z", "tweet text","1232", "123213");
INSERT INTO mentioned_tweets VALUES("123127", "2021-09-21T06:56:01.898Z", "2021-09-21T06:56:01.898Z", "123123222", "2021-09-21T06:56:01.898Z", "tweet text","1232", "123213");
```

# Conventions

in the database any field prefixed with a "t\_" indicates that this is an id from
twitter's API and hence can be used for querying detailed objects.
it is also used to differentiate between standard fields like created_at. for instance
in a table created_at field would be used to denote the timestamp of when a field
was created at in this database wherease t_created_at would be used for its created at
timestamp in twitter's database.

# Test

1. Ensure that schema of data returned by twitter hasn't changed against local copy of working data
   cd src/backend
   node test-mentions-schema-validation.js

2. Ensure schema validation logic against data returned by Twitter API

3.

# Prerequisites

- Knowledge of sql and specifically opearing sqlite3