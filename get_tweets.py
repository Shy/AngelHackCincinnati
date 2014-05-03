import tweepy
import sys
from alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

tweets = []

def get(num,tweettype,query):
    config = {}
    execfile("config.conf", config)
    auth = tweepy.OAuthHandler(config["consumer_key"], config["consumer_secret"])
    auth.set_access_token(config["access_token_key"], config["access_token_secret"])

    api = tweepy.API(auth)


    tweets = []

    jsonout = '['
    for tweet in api.search(q=query,result_type=tweettype,count=num):
        try:
            if not ('RT @' in tweet.text):
                sentimentvalue = alchemyapi.sentiment("text", tweet.text)

                if tweet.coordinates is not None:
                    lat = tweet.coordinates.coordinates[1]
                    lng = tweet.coordinates.coordinates[0]
                else:
                    lat = 0
                    lng = 0

                jsonout += '{"user":"'+str(tweet.user.screen_name)+ '","tweet": "' + str(tweet.text) +'","created_at":"'+ str(tweet.created_at) +'","sentimentvalue":'+ str(sentimentvalue["docSentiment"]["score"]) + ',"lat":'+ str(lat) + ',"lng":'+ str(lng) +'},'
        except:
            print sys.exc_info()[0]

    jsonout = jsonout[:-1]+']'
    return jsonout