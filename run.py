#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask
from flask import jsonify
from flask import request
import json

app = Flask(__name__, static_folder='www')

@app.route('/<path:path>')
def static_file(path):
    try:
        return app.send_static_file(path)
    except:
        return "Error"

@app.route('/')
def root():
    return app.send_static_file('index.html')

app.run(host='0.0.0.0', port=8080, debug=True, use_reloader=False)
