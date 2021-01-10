const DNS = require('dns2')

const { Packet } = DNS

const DnsDb = require('../model/db/dnsDb')
const { find } = require('lodash')

const { dnsEntriesFilePath } = require('../config')

const database = new DnsDb({
    dnsEntriesFilePath,
})

const dnsClient = new DNS()

const server = DNS.createServer(async (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request)
    const [question] = request.questions

    const entry = find(database.get(), (entry) => {
        return (
            entry.name === question.name &&
            toString(entry.type) === toString(question.type) &&
            toString(entry.class) === toString(question.class)
        )
    })

    if (entry) {
        response.answers.push({
            ...entry,
            type: entry.type,
            class: entry.class,
        })
    }

    send(response)
})

server.listen(53).then(() => {
    console.log('DNS Server started.')
})
