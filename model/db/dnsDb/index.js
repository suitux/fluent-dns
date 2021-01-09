const fs = require('fs')
const _ = require('lodash')
const crypto = require('crypto')

module.exports = class DnsDb {
    dnsEntriesFilePath = ''
    static _dnsEntries = []

    static _mustDnsEntriesBeUpdatedFromFile = false

    constructor(config) {
        this.dnsEntriesFilePath = config.dnsEntriesFilePath

        this._setEntriesFromFile()
    }

    get = () => {
        if (DnsDb._mustDnsEntriesBeUpdatedFromFile) {
            this._setEntriesFromFile()
        }

        return [...DnsDb._dnsEntries]
    }

    add = (newEntry) => {
        const entryNameExists = _.some(
            DnsDb._dnsEntries,
            (entry) =>
                entry.name === newEntry.name &&
                entry.type === newEntry.type &&
                entry.class === newEntry.class
        )

        if (!entryNameExists) {
            DnsDb._dnsEntries.push({ id: this._generateId(), ...newEntry })
            this._save()
        } else {
            throw Error('Entry already exists')
        }
    }

    remove = (id) => {
        DnsDb._dnsEntries = _.filter(DnsDb._dnsEntries, (entry) => entry.id !== id)

        this._save()
    }

    update = (id, newEntry) => {
        const oldEntryIndex = _.findIndex(
            DnsDb._dnsEntries,
            (entry) => entry.id === id
        )

        if (oldEntryIndex !== -1) {
            DnsDb._dnsEntries[oldEntryIndex] = { id, ...newEntry }
            this._save()
        }
    }

    _save = () => {
        fs.writeFileSync(this.dnsEntriesFilePath, JSON.stringify(DnsDb._dnsEntries))
        DnsDb._mustDnsEntriesBeUpdatedFromFile = true
    }

    _generateId = () => {
        return crypto.randomBytes(20).toString('hex')
    }

    _setEntriesFromFile() {
        const dnsEntriesBuffer = fs.readFileSync(this.dnsEntriesFilePath)

        DnsDb._dnsEntries = JSON.parse(
            new Buffer.from(dnsEntriesBuffer).toString()
        )

        DnsDb._mustDnsEntriesBeUpdatedFromFile = false
    }
}
