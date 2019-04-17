import discord, json, sys, random
from discord.ext import commands
from PIL import Image

colors = ["r", "y", "g", "b"]

cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "d2"]

bot = commands.Bot(command_prefix='!')

with open('config.json') as file:
    config = json.load(file)

@bot.command()
async def randdeck(ctx):
    try:
        images = []
        for id in range(7):
            id = random.choice(colors) + '_' + random.choice(cards)
            images.append(f'cards/{id}.png')
        img = map(Image.open, images)

        image = Image.new('RGBA', (242 * len(images), 362), (255, 0, 0, 0))

        x_offset = 0
        for im in img:
            image.paste(im, (x_offset, 0))
            x_offset += im.size[0]

        image.save('join.png', 'PNG')
        await ctx.send('', file=discord.File('join.png', 'deck.png'))
    except:
        await ctx.send('Looks like you entered an invalid card ID.')

@bot.command()
async def deck(ctx):
    print(ctx.message.author)

bot.run(config['token'])
