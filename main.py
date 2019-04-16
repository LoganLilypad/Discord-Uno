import discord
import json
from PIL import Image

img = Image.open("cards.png")
cropped = img.crop((0, 0, 256, 256))
cropped.save("card.png")
