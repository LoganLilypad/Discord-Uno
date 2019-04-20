const nrc = require('node-run-cmd');

const cards = [
    'r_0', 'r_1', 'r_2', 'r_3', 'r_4', 'r_5', 'r_6', 'r_7', 'r_8', 'r_9', 'r_d2', 'r_reverse', 'r_skip',
    'g_0', 'g_1', 'g_2', 'g_3', 'g_4', 'g_5', 'g_6', 'g_7', 'g_8', 'g_9', 'g_d2', 'g_reverse', 'g_skip',
    'b_0', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_d2', 'b_reverse', 'b_skip',
    'y_0', 'y_1', 'y_2', 'y_3', 'y_4', 'y_5', 'y_6', 'y_7', 'y_8', 'y_9', 'y_d2', 'y_reverse', 'y_skip',
    'w_color', 'w_d4',
];

let games = [];

module.exports.games = games;

module.exports.start = async (client, players) => {

    const game = {
        id: '' + Math.floor(Math.random() * 100000),
        players: players,
        started: `${+ new Date()}`,
        deck: {}
    }

    games.push(game);

    Object.keys(players).forEach(async (p) => {
        const user = await client.fetchUser(p);
        
        game.deck[p] = [];

        for (let i = 0; i < 7; i++) game.deck[p].push(cards[Math.floor(Math.random() * cards.length)]);

        nrc.run(`python ../../../../Python/merge.py ${game.deck[p].join(' ')}`)

        console.log(game.deck[p])

        const category = await client.guilds.get(players[p]).channels.find(c => c.name == 'UNO' && c.type == 'category');
        const channel = await client.guilds.get(players[p]).createChannel(`${user.username}-${p.substr(0, 8)}`, 'text');
        channel.setParent(category.id);

        channel.send(`Hello, <@${p}>! This is your private Uno room! Nobody except you can see messages here. You'll be playing with others from this room.`);

        channel.send('This is your deck', { file: '../Python/last.png' })
    });

}
