const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.send({'hosts': ['8.8.8.8', '1.1.1.1']})
})

router.post('/', function (req, res) {
    res.send('add host')
})

router.delete('/', function (req, res) {
    res.send('delete host')
})

router.patch('/', function (req, res) {
    res.send('update host')
})

module.exports = router
