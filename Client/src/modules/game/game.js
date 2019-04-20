module.exports.start = async (client, players) => {

    Object.keys(players).forEach(async (p) => {
        const user = client.fetchUser(p);
        
        console.log(user);

        const category = await client.guilds.get(players[p]).channels.find(c => c.name == 'UNO' && c.type == 'category');
        const channel = await client.guilds.get(players[p]).createChannel(`${user.username}-${p.substr(0, 8)}`, 'text');
        channel.setParent(category.id);
    });

}
