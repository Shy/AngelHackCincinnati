import tweepy
import sys
from alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

tweets = []


def get_tweets():
    config = {}
    execfile("config.conf", config)
    auth = tweepy.OAuthHandler(config["consumer_key"], config["consumer_secret"])
    auth.set_access_token(config["access_token_key"], config["access_token_secret"])

    api = tweepy.API(auth)


    tweets = []

    for tweet in api.search(q='#HackCincy',result_type='recent',count='25'):
        try:
            if not ('RT @' in tweet.text):
                output = "@" + tweet.user.screen_name +": " +tweet.text
                tweets.append(output)
        except:
            # print sys.exc_info()[0]
            i = 0
    return tweets

def get():
    global tweets
    tweets = get_tweets()
    jsonout = '['

    for item in tweets:
            try:
                tweets.remove(item)
                sentimentvalue = alchemyapi.sentiment("text", item)
                jsonout += '{"text": "' + str(item) + '","sentimentvalue","sentimentvalue":'+ str(sentimentvalue["docSentiment"]["score"]) +'},'
            except UnicodeError:
                print "UnicodeError"
    jsonout = jsonout[:-1]+']'
    return jsonout