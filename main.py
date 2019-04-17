from cards import make

import discord
from discord.ext import commands
import json

bot = commands.Bot(command_prefix='!')

with open('config.json') as file:
    config = json.load(file)

@bot.command()
async def card(ctx, arg):
    try:
        make(arg)
        print(arg)
        await ctx.send('', file=discord.File('card.png', 'cool.png'))
    except:
        await ctx.send('Looks like you entered an invalid card ID.')
bot.run(config['token'])
