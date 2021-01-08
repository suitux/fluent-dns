const express = require('express')
const Packet = require("dns2/packet");
const router = express.Router()

router.get('/', function (req, res) {
    res.send({'dnsEntries': [
            {
                name: 'google.es',
                type: Packet.TYPE.A,
                class: Packet.CLASS.IN,
                ttl: 1,
                address: '8.8.8.8'
            }

        , 'Dns entry 2']})
})

router.post('/', function (req, res) {
    res.send('add dns entry')
})

router.delete('/', function (req, res) {
    res.send('delete dns entry')
})

router.patch('/', function (req, res) {
    res.send('update dns entry')
})

module.exports = router
