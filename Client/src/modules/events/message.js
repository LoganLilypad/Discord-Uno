module.exports = async (client, message) => {
    if (message.author.bot) return;

    const prefixes = [client.config.prefix, `<@${client.user.id}>`, `<@!${client.user.id}>`];
    const prefix = prefixes.filter(p => message.content.toLowerCase().startsWith(p.toLowerCase()))[0];
    if (!prefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.commands.get(args.shift().toLowerCase());
    if (!command) return;

    const owner = (client.config.owners.indexOf(message.author.id) !== -1);
    if (command.ownerOnly && !owner) return;

    try {
        await command.run(client, message, args);

    } catch (e) {
        console.error(`[Message Event] Error:`);
        console.error(e);
    }
};