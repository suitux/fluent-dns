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
    res.send(req.body)
})

router.delete('/', function (req, res) {
    res.send('delete dns entry')
})

router.patch('/', function (req, res) {
    res.send('update dns entry')
})

module.exports = router
