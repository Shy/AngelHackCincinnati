import tweepy
import sys
from alchemyapi import AlchemyAPI
import json

alchemyapi = AlchemyAPI()

tweets = []

def get(num,tweettype,query):
    config = {}
    execfile("config.conf", config)
    auth = tweepy.OAuthHandler(config["consumer_key"], config["consumer_secret"])
    auth.set_access_token(config["access_token_key"], config["access_token_secret"])

    api = tweepy.API(auth)

    tweets = []

    for tweet in api.search(q=query,result_type=tweettype,count=num):
        item = dict()
        try:
            if not ('RT @' in tweet.text):
                sentimentvalue = alchemyapi.sentiment("text", tweet.text)

                item['user'] = tweet.user.screen_name
                item['text'] = tweet.text
                item['created_at'] = str(tweet.created_at)
                item['sentimentvalue'] = sentimentvalue["docSentiment"]["score"]
                item['coordinates'] = tweet.coordinates
                tweets.append(item)
        except:
            print sys.exc_info()[0]

    json_encoded = json.dumps(tweets,ensure_ascii=True)

    return json_encoded