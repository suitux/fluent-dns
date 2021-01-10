const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const _ = require('lodash')
const app = express()
const routes = require('./routes')

const port = 5353

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

_.forEach(routes, (route) => {
    app.use(route.path, route.router)
})

app.listen(port, () => {
    console.log('Rest API Started')
})

module.exports = app
