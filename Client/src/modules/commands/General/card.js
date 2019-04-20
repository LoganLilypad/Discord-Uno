module.exports = {
	card: {
		description: 'Get a card.', 
		usage: 'card (id)'
	}
};

const cards = [
    'r_0', 'r_1', 'r_2', 'r_3', 'r_4', 'r_5', 'r_6', 'r_7', 'r_8', 'r_9', 'r_d2', 'r_reverse', 'r_skip',
    'g_0', 'g_1', 'g_2', 'g_3', 'g_4', 'g_5', 'g_6', 'g_7', 'g_8', 'g_9', 'g_d2', 'g_reverse', 'g_skip',
    'b_0', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_d2', 'b_reverse', 'b_skip',
    'y_0', 'y_1', 'y_2', 'y_3', 'y_4', 'y_5', 'y_6', 'y_7', 'y_8', 'y_9', 'y_d2', 'y_reverse', 'y_skip',
    'w_color', 'w_d4',
]

module.exports.run = async (client, message) => {
    
    let args = message.content.slice(client.config.prefix.length).split(' ');

    let card = args.slice(1).join(' ');

    card = card 
            .replace('wild ', 'w_')
            .replace('red ', 'r_')
            .replace('yellow ', 'y_')
            .replace('blue ', 'b_')
            .replace('green ', 'g_')
            .replace('draw ', 'd')

    if (args[1]) {
        if (cards.includes(card)) {
            message.reply('here\'s your card', { file: `../cards/${card}.png` });
        } else {
            message.channel.send('Looks like you entered an invalid card name. Valid names are `red 5`, `yellow reverse`, `wild color`...')
        }
    } else {
        message.channel.send(`You must insert an argument after the command. (e.g) \`${client.config.prefix}red reverse\``)
    }
	
};