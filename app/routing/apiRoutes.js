const friends = require('../data/friends.js');

const routes = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friends);
        console.log(friends[0])
    });

    app.post('/api/friends', (req, res) => {
        console.log(req.body);
        // NEED TO DO CALCULATIONS
        friends.push(req.body);
    })
}

module.exports = routes;

