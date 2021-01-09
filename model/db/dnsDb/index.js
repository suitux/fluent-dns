const fs = require('fs')
const _ = require('lodash')
const crypto = require('crypto')

module.exports = class DnsDb {
    dnsEntriesFile = ''
    dnsEntries = []

    static _mustDnsEntriesBeUpdatedFromFile = false

    constructor(config) {
        this.dnsEntriesFile = config.dnsEntriesFile

        this._setEntriesFromFile()
    }

    get = () => {
        if (DnsDb._mustDnsEntriesBeUpdatedFromFile) {
            this._setEntriesFromFile()
        }

        return [...this.dnsEntries]
    }

    add = (newEntry) => {
        const entryNameExists = _.some(
            this.dnsEntries,
            (entry) =>
                entry.name === newEntry.name &&
                entry.type === newEntry.type &&
                entry.class === newEntry.class
        )

        if (!entryNameExists) {
            this.dnsEntries.push({ id: this._generateId(), ...newEntry })
            this._save()
        }
    }

    remove = (id) => {
        this.dnsEntries = _.filter(this.dnsEntries, (entry) => entry.id !== id)

        this._save()
    }

    update = (id, newEntry) => {
        const oldEntryIndex = _.findIndex(
            this.dnsEntries,
            (entry) => entry.id === id
        )

        if (oldEntryIndex !== -1) {
            this.dnsEntries[oldEntryIndex] = { id, ...newEntry }
            this._save()
        }
    }

    _save = () => {
        fs.writeFileSync(this.dnsEntriesFile, JSON.stringify(this.dnsEntries))
        DnsDb._mustDnsEntriesBeUpdatedFromFile = true
    }

    _generateId = () => {
        return crypto.randomBytes(20).toString('hex')
    }

    _setEntriesFromFile() {
        const dnsEntriesBuffer = fs.readFileSync(this.dnsEntriesFile)

        this.dnsEntries = JSON.parse(
            new Buffer.from(dnsEntriesBuffer).toString()
        )

        DnsDb._mustDnsEntriesBeUpdatedFromFile = false
    }
}
