module.exports = {
	help: {
		description: 'ping the bot', 
		usage: 'ping'
	}
};

module.exports.run = async (client, message) => {
	
	const ping = await message.channel.send('Ping?');
	ping.edit(`:clock1030: Pong! ${ping.createdTimestamp - message.createdTimestamp}ms response\n:sparkling_heart:  ${Math.round(client.ping)}ms API heartbeat`);
	
};