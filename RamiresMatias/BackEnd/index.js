const express = require('express');
const routes = require('./routes/router.js');

const cors = require('cors');

const app = express();

require('./database');

app.use(express.json());

app.use(cors())

app.use(express.urlencoded({ extended: false }));

app.use(routes)

app.listen(3000)