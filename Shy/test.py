from alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

myText = "I'm using AlchemyAPI"
response = alchemyapi.sentiment("text", myText)
print "Sentiment: ", response["docSentiment"]["type"]
print "Sentiment: ", response["docSentiment"]["score"]

myText = "No beer until 5pm? THANKS CORPORATE AMERICA!"
response = alchemyapi.sentiment("text", myText)
print "Sentiment: ", response["docSentiment"]["type"]
print "Sentiment: ", response["docSentiment"]["score"]