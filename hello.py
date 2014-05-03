import os
import get_tweets
from flask import Flask
from flask import url_for, redirect

app = Flask(__name__)
app.debug = True

@app.route('/')
def home():
    return redirect(url_for('static', filename='index.html'))


@app.route('/api')
def hello():
    return redirect(url_for('static', filename='example.txt'))
    # return get_tweets.get()
