const friends = require('../data/friends.js');

const routes = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

}

module.exports = routes;

