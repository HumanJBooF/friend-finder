const path = require('path');

module.exports = (app) => {

    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '/../public/home.html'))
    })


    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, '/../public/survey.html'))
    });


}