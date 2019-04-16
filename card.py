from PIL import Image

img = Image.open("cards.png")
cropped = img.crop((0, 0, 165, 256))
cropped.save("card.png")
