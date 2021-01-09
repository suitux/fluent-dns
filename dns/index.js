const dns = require('dns2')

const { Packet } = dns

const DnsDb = require('../model/db/dnsDb')
const { find } = require('lodash')

const { dnsEntriesFilePath } = require('../config')


const database = new DnsDb({
    dnsEntriesFilePath
})

const entries = database.get()

const server = dns.createServer((request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request)
    const [question] = request.questions
    const { name } = question

    const entry = find(entries, (entry) => {
        return entry.name === name
    })

    if (entry) {
        response.answers.push({
            ...entry,
            type: Packet.TYPE[entry.type],
            class: Packet.CLASS[entry.class],
        })
    }
    send(response)
})

server.listen(53).then(() => {
    console.log('DNS Server started.')
})
