import os
import json
import get_tweets
from flask import Flask
from flask import url_for, redirect
from flask import request
from flask import Response

app = Flask(__name__)
app.debug = True

@app.route('/')
def home():
    return redirect(url_for('static', filename='index.html'))

@app.route('/apiexample', methods=['GET'])
def hellostatic():
    f = open('static/example.json','r')
    x = json.load(f)
    callback = request.args.get('callback')
    x = json.dumps(x,ensure_ascii=True)
    if callback != None:
        x =  str(callback) + "(" + x + ");"
    ret = str(x)
    return Response(response=ret, status=200, headers=None, mimetype='application/json', content_type=None, direct_passthrough=False)

@app.route('/api', methods=['GET'])
def hello():

    num = request.args.get('number')
    tweettype =  request.args.get('type')
    query = request.args.get('hashtag')
    callback = request.args.get('callback')
    if num == None:
        num =0
    if tweettype == None:
        tweettype = 'recent'
    if query == None:
        query = 'hackcincy'
    else:
        query = '#' + query

    ret = get_tweets.get(num,tweettype,query,callback)
    return Response(response=ret, status=200, headers=None, mimetype='application/json', content_type=None, direct_passthrough=False)
