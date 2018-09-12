const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./app/routing/htmlRoutes.js')(app);

app.use(express.static('app/public'))

app.listen(PORT, () => { console.log(`LISTENING ${PORT}`); })