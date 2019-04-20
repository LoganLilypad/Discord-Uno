module.exports = {
	help: {
		description: 'test command', 
		usage: 'test'
	}
};

module.exports.run = async (client, message) => {
    
    const category = await message.guild.channels.find(c => c.name == 'UNO' && c.type == 'category')
    const channel = await message.guild.createChannel(`${message.author.username}-${message.author.id.substr(0, 8)}`, 'text');
    channel.setParent(category.id);

};