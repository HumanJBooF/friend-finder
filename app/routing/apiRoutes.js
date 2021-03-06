const friends = require('../data/friends.js');

const routes = (app) => {

    app.get('/api/friends', (req, res) => {
        // send the friends array to this url
        res.json(friends);
    });
    // POST route for /api/friends
    app.post('/api/friends', (req, res) => {
        // putting the user object into a variable
        let currentUser = req.body;
        let differences = [];
        // if there is more then one friend
        if (friends.length > 1) {
            console.log(friends.length)
            // loop through all friends
            friends.forEach(friend => {
                let totalDif = 0;
                // For each score, compare the scores and add the absolute value of the difference to the total difference
                for (let i = 0; i < currentUser.scores.length; i++) {
                    let otherScore = friend.scores[i];
                    let currentScore = parseInt(currentUser.scores[i]);
                    let difference = +otherScore - +currentScore;
                    totalDif += Math.abs(difference);
                    console.log(`these are the total diffs: ${totalDif}`);
                }
                // salt-n-peppas here to ahhhh push-it
                differences.push(totalDif);
            });
            // get the minimun difference
            let minDifference = Math.min.apply(null, differences);
            // empty array incase there is a tie, we can send more then one 'friend'
            let bestMatches = [];

            for (let i = 0; i < differences.length; i++) {
                if (differences[i] === minDifference) {
                    bestMatches.push(friends[i]);
                }
            }
            console.log(bestMatches);
            res.json(bestMatches);
        } else {
            res.json(friends);
        }
        friends.push(currentUser);
    });
};

module.exports = routes;

