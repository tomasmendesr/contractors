const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model');
const { contractRouter } = require('./routes/contractRouter');
const { jobRouter } = require('./routes/jobRouter');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/contracts', contractRouter)
app.use('/jobs', jobRouter)

module.exports = app;
