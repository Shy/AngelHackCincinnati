import os
import get_tweets
from flask import Flask
from flask import url_for, redirect
from flask import request

app = Flask(__name__)
app.debug = True

@app.route('/')
def home():
    return redirect(url_for('static', filename='index.html'))

@app.route('/api', methods=['GET'])
def hello():

    num = request.args.get('number')
    tweettype =  request.args.get('type')
    query = request.args.get('query')
    if num == None:
        num =0
    if tweettype == None:
        tweettype = 'recent'
    if query == None:
        query = '#hackcincy'
    # return redirect(url_for('static', filename='example.txt'))
    return get_tweets.get(num,tweettype,query)
