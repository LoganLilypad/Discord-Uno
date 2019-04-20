const queue = require('../../game/queue.js');

module.exports = {
	help: {
		description: 'Queue for the game.', 
		usage: 'play'
	}
};

module.exports.run = async (client, message) => {
    if (queue.players.hasOwnProperty(message.author.id)) {
        queue.removePlayer(message.author.id);
        message.channel.send(`You've left the queue. **${Object.keys(queue.players).length}** left in the queue.`);
    } else if (Object.keys(queue.players).length >= 10) {
        message.channel.send(`Too many players queued. Wait for the round to start before trying to queue.`);
    } else {
        queue.addPlayer(message.author.id, message.guild.id);
        message.channel.send(`You've joined the queue. **${Object.keys(queue.players).length}** in the queue now.`);
        if (Object.keys(queue.players).length == 2)
            queue.start(client);
        
    }
};