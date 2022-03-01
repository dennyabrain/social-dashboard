# Scrape Historical Data
run `node scrape_historical.js`
This will look at the `user_handles` in `config.js` and use Twitter Full Archive Search to find tweets mentioning these handles. These tweets are then validated to ensure that the twitter response hasn't changed from what the system expects. The validated tweets are then stored in the database. All errors are stored in the database in the errors_scraping table.

# Scrape Data since previous scraping
run `node scrape_new.js`
This will look at the `user_handles` in `config.js` and for each user, get the tweet id of the most recent tweet stored in the database. This tweet id is then used as the `since_id` parameter and passed to the Twitter Full Archive Search function. This way only tweets published since the last time we scraped are fetched and stored in the database.

The expected way to scrape is to run the `scrape_historical` script the first time you are setting up the project and then to run your script in some kind of automated cron job, run the `scrape_new` script.

# Tweet Labelling and Categorization
run `node categorize_tweets.js`
This will get all tweets that haven't been categorized yet and run the ML functions against the tweets and store the results in the tweet

# Graph Generation
run `node generate_graphs.js`
This script will compute all the data required to visualize the tweets. This optimization ensures that the visualizations don't require database queries to be seen. If you configure a cron job that runs the `generate_graph` script periodically, this will save up on your server bandwidth cost. The data powering the vizualizations can be stored as static assets and bundled along with your website.