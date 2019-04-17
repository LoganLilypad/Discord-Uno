from PIL import Image

yloc = {
    "r": 360 * 0,
    "y": 360 * 1,
    "g": 360 * 2,
    "b": 360 * 3
}

xloc = {
    "0": 240 * 0,
    "1": 240 * 1,
    "2": 240 * 2,
    "3": 240 * 3,
    "4": 240 * 4,
    "5": 240 * 5,
    "6": 240 * 6,
    "7": 240 * 7,
    "8": 240 * 8,
    "9": 240 * 9,
    "skip": 240 * 10,
    "reverse": 240 * 11,
    "d2": 240 *  12
}

def make(id):
    cropImage(xloc[id[2:]], yloc[id[0]])

def cropImage(x, y):
    img = Image.open('cards.png')
    cropped = img.crop((x, y, x + 242, y + 362))
    cropped.save('card.png')