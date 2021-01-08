const fs = require('fs')
const _ = require('lodash')

module.exports = class DnsDb {
    dnsEntriesFile = ''
    dnsEntries = []

    constructor(config) {
        this.dnsEntriesFile = config.dnsEntriesFile

        const dnsEntriesBuffer = fs.readFileSync(this.dnsEntriesFile)

        this.dnsEntries = JSON.parse(
            new Buffer.from(dnsEntriesBuffer).toString()
        )
    }

    get = () => {
        return [...this.dnsEntries]
    }

    add = (newEntry) => {
        const entryNameExists = _.some(
            this.dnsEntries,
            (entry) => entry.name === newEntry.name
        )

        if (!entryNameExists) {
            this.dnsEntries.push(newEntry)
            this._save()
        }
    }

    remove = (removeEntry) => {
        this.dnsEntries = _.filter(
            this.dnsEntries,
            (entry) => entry.name !== removeEntry.name
        )

        this._save()
    }

    update = (oldEntry, newEntry) => {
        const oldEntryIndex = _.findIndex(
            this.dnsEntries,
            (entry) => entry.name !== oldEntry.name
        )

        if(oldEntryIndex !== -1) {
            this.dnsEntries[oldEntryIndex] = newEntry
            this._save()
        }
    }

    _save = () => {
        fs.writeFileSync(
            this.dnsEntriesFile,
            JSON.stringify(this.dnsEntries)
        )
    }
}
