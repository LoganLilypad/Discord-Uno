from PIL import Image

def generate_cards(images):
    for i in range(len(images)):
        images[i] = 'cards/' + images[i] + '.png'

    img = map(Image.open, images)

    image = Image.new('RGBA', (242 * len(images), 362), (255, 0, 0, 0))

    x_offset = 0
    for im in img:
        image.paste(im, (x_offset, 0))
        x_offset += im.size[0]

    image.save('last.png', 'PNG')