import discord, json, sys, random
from discord.ext import commands
from PIL import Image

colors = ["r", "y", "g", "b"]

cards = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "d2"]

playerDeck = {
    '536269399783505950': ['r_5', 'y_reverse', 'g_9', 'g_d2', 'b_3', 'y_7', 'b_2']
}

bot = commands.Bot(command_prefix='!')

with open('config.json') as file:
    config = json.load(file)

@bot.command()
async def randdeck(ctx):
    try:
        images = []
        for id in range(7):
            id = random.choice(colors) + '_' + random.choice(cards)
            images.append(id)
        genCards(images)
        await ctx.send('', file=discord.File('join.png', 'deck.png'))
    except:
        await ctx.send('Looks like you entered an invalid card ID.')

@bot.command()
async def deck(ctx):
    if not playerDeck.get(str(ctx.message.author.id)):
        await ctx.send('You aren\'t in a game!')
    else:
        genCards(playerDeck.get(str(ctx.message.author.id)))
        await ctx.send('Here\'s your deck!', file=discord.File('join.png', 'deck.png'))

def genCards(images):
    for i in range(len(images)):
        images[i] = 'cards/' + images[i] + '.png'

    img = map(Image.open, images)

    image = Image.new('RGBA', (242 * len(images), 362), (255, 0, 0, 0))

    x_offset = 0
    for im in img:
        image.paste(im, (x_offset, 0))
        x_offset += im.size[0]

    image.save('join.png', 'PNG')

bot.run(config['token'])
