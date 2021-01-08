const fs = require('fs')

module.exports = class DnsDb {

    dnsEntriesFile = ''
    dnsEntries = []

    constructor(config) {
        this.dnsEntriesFile = config.dnsEntriesFile

        const dnsEntriesBuffer = fs.readFileSync(this.dnsEntriesFile)

        this.dnsEntries = JSON.parse(new Buffer.from(dnsEntriesBuffer).toString())
    }

    getDnsEntries = () => {
        return this.dnsEntries
    }

    addDnsEntry = () => {}

    removeDnsEntry = () => {}

    updateDnsEntry = () => {}
}
