const DNS = require('dns2')
const nodeDns = require('dns');
const util = require('util')
const resolve = util.promisify(nodeDns.resolve)

const { Packet } = DNS

const DnsDb = require('../model/db/dnsDb')
const { find } = require('lodash')

const { dnsEntriesFilePath } = require('../config')

const database = new DnsDb({
    dnsEntriesFilePath,
})

const dnsClient = new DNS({nameServers: ['8.8.8.8']})


const server = DNS.createServer(async (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request)
    const [question] = request.questions

    const entry = find(database.get(), (entry) => {
        return (
            entry.name === question.name &&
            entry.type.toString() === question.type.toString() &&
            entry.class.toString() === question.class.toString()
        )
    })

    if (entry) {
        response.answers.push({
            ...entry,
            type: entry.type,
            class: entry.class,
        })
    } else {
        const entry = await dnsClient
            .resolve(
                question.name,
                Object.keys(Packet.TYPE)[question.type - 1],
                question.class
            )
            .catch((e) => console.log(e))

        let answers = entry.answers

        if(entry.answers.length === 0) {
            const res = await resolve(question.name, Object.keys(Packet.TYPE)[question.type - 1]).catch(e => console.log(e));

            if(res && res.length > 0) {
                answers = [{
                    name: entry.name,
                    ttl: 300,
                    type: question.type,
                    class: question.class,
                    address: res[0]
                }]
            }
        }

        response.answers.push(...entry.answers)
    }

    send(response)
})

server.listen(53).then(() => {
    console.log('DNS Server started.')
})
