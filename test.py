from alchemyapi import AlchemyAPI
alchemyapi = AlchemyAPI()

myText = "):"
response = alchemyapi.sentiment("text", myText)
print "Sentiment: ", response["docSentiment"]["type"]
print "Sentiment: ", response["docSentiment"]["score"]

myText = "(:"
response = alchemyapi.sentiment("text", myText)
print "Sentiment: ", response["docSentiment"]["type"]
print "Sentiment: ", response["docSentiment"]["score"]