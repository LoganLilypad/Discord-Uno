import discord, json, sys, random
from discord.ext import commands
from cards import generate_cards

bot = commands.Bot(command_prefix='!')

colors     = ["r", "y", "g", "b"]
cards      = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "d2"]
playerDeck = {
    '53626939': ['r_5', 'g_6', 'y_reverse', 'b_skip', 'r_skip', 'y_2', 'g_d2']
}

with open('config.json') as file:
    config = json.load(file)

@bot.command()
async def randdeck(ctx):
    try:
        images = []
        for id in range(7):
            id = random.choice(colors) + '_' + random.choice(cards)
            images.append(id)
        generate_cards(images)
        await ctx.send('', file=discord.File('last.png', 'deck.png'))
    except:
        await ctx.send('Looks like you entered an invalid card ID.')

@bot.command()
async def deck(ctx):
    if not playerDeck.get(str(ctx.message.author.id)[:8]):
        await ctx.send('You aren\'t in a game!')
    elif ctx.message.channel.name[-8:] != str(ctx.message.author.id)[:8]:
        await ctx.send(f'You can only use this command in your private channel! The channel is in UNO category and should look something like #{ctx.message.author.name.lower()}-{str(ctx.message.author.id)[:8]}.')
    else:
        generate_cards(playerDeck.get(str(ctx.message.author.id)[:8]))
        await ctx.send('Here\'s your deck!', file=discord.File('last.png', 'deck.png'))

bot.run(config['token'])
