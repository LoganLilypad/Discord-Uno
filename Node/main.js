const fetch = require('node-fetch');

const cards = [
    'r_0', 'r_1', 'r_2', 'r_3', 'r_4', 'r_5', 'r_6', 'r_7', 'r_8', 'r_9', 'r_d2', 'r_reverse', 'r_skip',
    'g_0', 'g_1', 'g_2', 'g_3', 'g_4', 'g_5', 'g_6', 'g_7', 'g_8', 'g_9', 'g_d2', 'g_reverse', 'g_skip',
    'b_0', 'b_1', 'b_2', 'b_3', 'b_4', 'b_5', 'b_6', 'b_7', 'b_8', 'b_9', 'b_d2', 'b_reverse', 'b_skip',
    'y_0', 'y_1', 'y_2', 'y_3', 'y_4', 'y_5', 'y_6', 'y_7', 'y_8', 'y_9', 'y_d2', 'y_reverse', 'y_skip',
    'w_color', 'w_d4',
]

function randStuff() {
    return cards[Math.floor(Math.random() * cards.length)]
}

setInterval(() => {
    const array = [randStuff(), randStuff(), randStuff(), randStuff()];
    fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            images: array
        })
    });
    console.log(array);
}, 250)
