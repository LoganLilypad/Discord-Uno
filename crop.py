from PIL import Image

def cropImage(x, y):
    img = Image.open('cards.png')
    cropped = img.crop((x, y, x + 165, y + 256))
    cropped.save('card.png')