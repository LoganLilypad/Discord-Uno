import json
from PIL import Image

from flask import Flask, request
app = Flask(__name__)

def generate_cards(images):
    for i in range(len(images)):
        images[i] = 'cards/' + images[i] + '.png'

    image = Image.new('RGBA', (242 * len(images), 362), (255, 0, 0, 0))

    x_offset = 0
    for im in map(Image.open, images):
        image.paste(im, (x_offset, 0))
        x_offset += im.size[0]

    image.save('last.png', 'PNG')


@app.route('/', methods=['POST'])
def result():
    generate_cards(json.loads(request.data)['images'])
    return '{}'