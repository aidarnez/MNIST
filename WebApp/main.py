import urllib
from flask import Flask, render_template, request, jsonify
import numpy as np
import cv2
import os
from model import make_prediction


app = Flask(__name__)
app.config['SECRET_KEY'] = 'sldkf'

@app.route('/')
def start():
    return render_template('index.html')

@app.route('/pic', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.json
    jsdata = jsdata.get('data')
    resp = urllib.request.urlopen(jsdata)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (28, 28), interpolation=cv2.INTER_LINEAR)
    image = cv2.bitwise_not(image)
    result = int(make_prediction(image))
    response = {'result': result}
    return jsonify(response)

@app.route('/confirm', methods = ['POST'])
def confirm():
    jsdata = request.json
    url = jsdata.get('pic')
    label = jsdata.get('data')
    print(label)
    files = os.listdir('img')
    name = 'img/' + str(label) + '_' + str(len(files)) + '.txt'
    file = open(name, "w")
    file.write(url)
    file.close()
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=False)