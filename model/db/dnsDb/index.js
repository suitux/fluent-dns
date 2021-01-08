const fs = require('fs')

module.exports = class DnsDb {
    hostsFile = ''
    dnsEntriesFile = ''

    dnsEntries = []
    hosts = []

    constructor(config) {
        this.hostsFile = config.hostsFile
        this.dnsEntriesFile = config.dnsEntriesFile

        const hostsBuffer = fs.readFileSync(this.hostsFile)
        const dnsEntriesBuffer = fs.readFileSync(this.dnsEntriesFile)

        this.hosts = JSON.parse(new Buffer.from(hostsBuffer).toString())
        this.dnsEntries = JSON.parse(new Buffer.from(dnsEntriesBuffer).toString())
    }

    getHosts = () => {
        return this.hosts
    }

    addHost = () => {}

    removeHost = () => {}

    updateHost = () => {}

    getDnsEntries = () => {
        return this.dnsEntries
    }

    addDnsEntry = () => {}

    removeDnsEntry = () => {}

    updateDnsEntry = () => {}
}
