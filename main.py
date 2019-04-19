from random import choice, randint
from discord.ext import commands
from cards import generate_cards
import discord, json, sys

bot = commands.Bot(command_prefix='!')

games, playerDeck = {}
colors = ["r", "y", "g", "b"]
cards  = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "d2"]
queue  = []


with open('config.json') as file:
    config = json.load(file)

@bot.command()
async def randdeck(ctx):
    try:
        images = []
        for _ in range(7):
            images.append(random.choice(colors) + '_' + random.choice(cards))
        generate_cards(images)
        await ctx.send('', file=discord.File('last.png', 'deck.png'))
    except:
        await ctx.send('Looks like you entered an invalid card ID.')

@bot.command()
async def deck(ctx):
    if not playerDeck.get(str(ctx.message.author.id)[:8]):
        await ctx.send('You aren\'t in a game!')
    elif ctx.message.channel.name[-8:] != str(ctx.message.author.id)[:8]:
        await ctx.send(f'You can only use this command in your private channel! The channel is in UNO category and should look like #{ctx.message.author.name.lower()}-{str(ctx.message.author.id)[:8]}.')
    else:
        generate_cards(playerDeck.get(str(ctx.message.author.id)[:8]))
        await ctx.send('Here\'s your deck!', file=discord.File('last.png', 'deck.png'))

@bot.command()
async def play(ctx):
    if queue.__contains__(ctx.message.author.id):
        queue.remove(ctx.message.author.id)
        await ctx.send(f'Left the queue. **{len(queue)}** in queue now.')
    elif playerDeck.get(str(ctx.message.author.id)[:8]):
        await ctx.send('You\'re currently in a game!')
    elif not queue.__contains__(ctx.message.author.id):
        queue.append(ctx.message.author.id)
        await ctx.send(f'Joined the queue! **{len(queue)}** in the queue now.')
        if len(queue) == 2:
            ctx.send('The game should start in about 15 seconds!')
    else:
        ctx.send('Something strange is happening! :ghost:')

bot.run(config['token'])
