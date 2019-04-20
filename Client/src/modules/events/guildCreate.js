module.exports = async (client, guild) => {

    const category = await guild.createChannel('UNO', 'category');
    const channel = await guild.createChannel('lobby', 'text');
    channel.setParent(category.id);
    
};