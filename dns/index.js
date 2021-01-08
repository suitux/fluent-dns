const dns = require('dns2')

const { Packet } = dns

const DnsDb = require('../model/db/dnsDb')
const { find } = require('lodash')

const database = new DnsDb({
    dnsEntriesFile: './shared/db/dns-entries.json',
})

const entries = database.getDnsEntries()

const server = dns.createServer((request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request)
    const [question] = request.questions
    const { name } = question

    const entry = find(entries, (entry) => {
        return entry.name === name
    })

    if (entry) {
        console.log(JSON.stringify(entry))
        response.answers.push({
            ...entry,
            type: Packet.TYPE.A,
            class: Packet.CLASS.IN,
        })
    }
    send(response)
})

server.listen(53).then(() => {
    console.log('DNS Server started.')
})
