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
        let entryAdded = {}

        const entryNameExists = _.some(
            DnsDb._dnsEntries,
            (entry) =>
                entry.name === newEntry.name &&
                entry.type === newEntry.type &&
                entry.class === newEntry.class
        )

        if (!entryNameExists) {
            entryAdded = { id: this._generateId(), ...newEntry }
            DnsDb._dnsEntries.push(entryAdded)
            this._save()
        } else {
            throw Error('Entry already exists')
        }

        return entryAdded
    }

    remove = (id) => {
        const initialLength = DnsDb._dnsEntries.length
        DnsDb._dnsEntries = _.filter(DnsDb._dnsEntries, (entry) => entry.id !== id)

        this._save()

        return initialLength === DnsDb._dnsEntries.length ? null : id
    }

    update = (id, newEntry) => {
        const oldEntryIndex = _.findIndex(
            DnsDb._dnsEntries,
            (entry) => entry.id === id
        )

        if (oldEntryIndex !== -1) {
            const updatedEntry = { id, ...newEntry }
            DnsDb._dnsEntries[oldEntryIndex] = updatedEntry
            this._save()

            return updatedEntry
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
