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
    let message = {error: false}
    let entry = {}

    try {
        entry = dnsDb.add(req.body)
    } catch (e) {
        res.status(400)
        message = {
            error: true,
            message: e.message,
        }
    }

    res.send({...message, data: entry})
})

router.delete('/', function (req, res) {
    const message = { error: false }

    const removedId = dnsDb.remove(req.body.id)
    if (!removedId) {
        res.status(400)
        message.error = true
    }

    res.send({ ...message, removedId })
})

router.patch('/', function (req, res) {
    const message = { error: false }

    const updatedEntry = dnsDb.update(req.body.id, req.body.data)
    if (!updatedEntry) {
        res.status(400)
        message.error = true
    }

    res.send({ ...message, data: updatedEntry })
})

module.exports = router
