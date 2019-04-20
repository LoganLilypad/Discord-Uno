const game = require('./game');

let players = {};

module.exports.addPlayer = (id, server) => players[id] = server;

module.exports.removePlayer = (id) => delete players[id];

module.exports.players = players;

module.exports.start = async (client) => {

    let message = {};

    client.guilds.forEach(async g => {
        
        const lobby = g.channels.find(c => c.name == 'lobby' && c.type == 'text' && c.parent.name == 'UNO');
        message[g.id] = await lobby.send('The game is starting in 30 seconds. Queue using **uno play** if you haven\'t already.');
        
    });
    
    let seconds = 10;

    const queue = setInterval(() => {
        
        if (Object.keys(players).length >= 2) {

            seconds--;

            if (seconds !== 0 && seconds % 2 == 0) client.guilds.forEach(g => 
                message[g.id].edit(`The game is starting in ${seconds} seconds. Queue using **uno play** if you haven't already.`)
            );

            if (seconds <= 0) {

                clearInterval(queue);
                game.start(client, players);
                delete players;
                client.guilds.forEach(g => 
                    message[g.id].edit(`The game has started. Queue for another round using **uno play**.`)
                );

            }

        } else {

            clearInterval(queue);

            client.guilds.forEach(g => {
        
                const lobby = g.channels.find(c => c.name == 'lobby' && c.type == 'text' && c.parent.name == 'UNO');
                lobby.send('Game has been cancelled because there aren\'t enough players in the queue. Use **uno play** to join the queue.');
                
            });

        }
        
    }, 1000);
}