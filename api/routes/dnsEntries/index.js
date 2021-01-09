const express = require('express')
const Packet = require('dns2/packet')
const router = express.Router()
const { dnsEntriesFilePath } = require('../../../config')
const DnsDb = require('../../../model/db/dnsDb')

const dnsDb = new DnsDb({ dnsEntriesFilePath })

router.get('/', function (req, res) {
    res.send(dnsDb.get())
})

router.post('/', function (req, res) {
    let message = null

    try {
        message = dnsDb.add(req.body)
    } catch (e) {
        res.status(400)
        message = e.message
    }

    res.send(message)
})

router.delete('/', function (req, res) {
    let message = dnsDb.remove(req.body.id)

    res.send(message)
})

router.patch('/', function (req, res) {
    res.send('update dns entry')
})

module.exports = router
