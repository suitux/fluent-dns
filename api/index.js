const express = require('express')
const _ = require('lodash')
const app = express()
const port = 5353

const routes = require('./routes')

_.forEach(routes, (route) => {
    app.use(route.path, route.router)
})

app.listen(port)
