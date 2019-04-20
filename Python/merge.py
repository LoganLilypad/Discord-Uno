import sys
from PIL import Image

images = sys.argv[1:]

for i in range(len(images)):
    images[i] = '../cards/' + images[i] + '.png'

image = Image.new('RGBA', (242 * len(images), 362), (255, 0, 0, 0))

x_offset = 0
for im in map(Image.open, images):
    image.paste(im, (x_offset, 0))
    x_offset += im.size[0]

image.save('last.png', 'PNG')