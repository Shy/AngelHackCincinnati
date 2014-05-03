import tweepy
import sys
from alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

tweets = []


def get():
    config = {}
    execfile("config.conf", config)
    auth = tweepy.OAuthHandler(config["consumer_key"], config["consumer_secret"])
    auth.set_access_token(config["access_token_key"], config["access_token_secret"])

    api = tweepy.API(auth)


    tweets = []

    jsonout = '['
    for tweet in api.search(q='#HackCincy',result_type='recent',count='25'):

        try:
            if not ('RT @' in tweet.text):
                sentimentvalue = alchemyapi.sentiment("text", tweet.text)
                jsonout += '{"user":"'+str(tweet.user.screen_name)+ '","tweet": "' + str(tweet.text) + '","sentimentvalue":'+ str(sentimentvalue["docSentiment"]["score"]) +'},'
        except:
            print sys.exc_info()[0]

    jsonout = jsonout[:-1]+']'
    return jsonout