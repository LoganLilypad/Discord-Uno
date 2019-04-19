const { readdir } = require('fs').promises;

module.exports = {
	
	async commands (client) {
	    client.commands = new Map();
	    try {
			const categories = await readdir('./src/modules/commands');
			for (const category of categories) {
				const commands = (await readdir(`./src/modules/commands/${category}`)).filter(e => e.endsWith('.js')).map(e => e.slice(0, -3));
				for (const c of commands) {

				const lCommand = c.toLowerCase();
				let { help, aliases, ownerOnly, run } = require(`./commands/${category}/${c}`);

				if (typeof help !== 'object') help = {};
				if (typeof help.usage !== 'string' || !help.usage) help.usage = '';
				if (typeof help.description !== 'string' || !help.description) help.description = 'No description';

				if (typeof ownerOnly !== 'boolean') ownerOnly = false;

				if (!Array.isArray(aliases)) aliases = [];
				aliases = aliases.filter(a => a && typeof a === 'string');

				const commandObject = { name: c, category, help, ownerOnly, aliases, run };

				client.commands.set(lCommand, commandObject);
				aliases.forEach(a => client.commands.set(a.toLowerCase(), commandObject));
			}
		}
	    } catch (e) {
			console.error('[Command Handler] Error:');
			console.error(e);

			process.exit();
	    }
	},

	async events (client) {

		try {
        	const events = (await readdir('./src/modules/events')).filter(e => e.endsWith('.js')).map(e => e.slice(0, -3));
			for (const e of events) {

				const run = require(`./events/${e}`);
				client.on(e, run.bind(null, client));
			}
		} catch (e) {
			console.error('[Event Handler] Error:');
			console.error(e);

			process.exit();
		}

	}

};