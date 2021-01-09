const DnsDb = require('../../../model/db/dnsDb')
const fs = require('fs')
const _ = require('lodash')

let dnsDb
const dnsEntriesFile = './test/model/db/files/dnsEntries.json'

const dnsFileEntries = [
    {
        id: 'a',
        name: 'lol',
        address: '8.8.8.8',
        ttl: 60,
        type: 'A',
        class: 'IN',
    },
    {
        id: 'b',
        name: 'test',
        address: '8.8.8.8',
        ttl: 60,
        type: 'A',
        class: 'IN',
    },
    {
        id: 'c',
        name: 'taaaaaest',
        address: '8.8.4.4',
        ttl: 60,
        type: 'AAAA',
        class: 'OUT',
    },
]

beforeEach(() => {
    fs.writeFileSync(dnsEntriesFile, JSON.stringify(dnsFileEntries))

    dnsDb = new DnsDb({
        dnsEntriesFile,
    })
})

afterEach(() => {
    fs.unlinkSync(dnsEntriesFile)
})

test('Given a loaded dns database with entries, when get all the entries, it should retrieve all the entries', () => {
    const entries = dnsDb.get()

    expect(entries).not.toBeUndefined()
    expect(entries.length).not.toBeLessThan(1)
})

test('Given a loaded dns database with entries, when we add one entry, the entry must be saved', () => {
    const entry = {
        name: 'new_entry',
        address: '8.8.8.8',
        ttl: 60,
        type: 'A',
        class: 'IN',
    }

    const oldEntries = dnsDb.get()

    dnsDb.add(entry)

    const newEntries = dnsDb.get()

    expect(oldEntries).not.toBe(newEntries)
    expect(oldEntries.length).toBeLessThan(newEntries.length)
})

test('Given a loaded dns database with entries, when we add one existing entry, the entry wont be added', () => {
    const entry = dnsFileEntries[0]

    const oldEntries = dnsDb.get()

    dnsDb.add(entry)

    const newEntries = dnsDb.get()

    expect(oldEntries.length).toBe(newEntries.length)
})

test('Given a loaded dns database with entries, when we remove entry, the entry must be removed', () => {
    const entryId = 'a'

    const oldEntries = dnsDb.get()

    dnsDb.remove(entryId)

    const newEntries = dnsDb.get()

    expect(oldEntries).not.toBe(newEntries)
    expect(newEntries.length).toBeLessThan(oldEntries.length)
})

test('Given a loaded dns database with entries, when we update a entry, then the entry must be updated', () => {
    const newEntryName = 'jaaarl'
    const entryIdToUpdate = 'a'
    const entryToUpdate = { ...dnsFileEntries[0] }
    entryToUpdate.name = newEntryName

    const entriesWithNoUpdatedEntry = dnsDb.get()

    dnsDb.update(entryIdToUpdate, entryToUpdate)

    const entriesWithUpdatedEntry = dnsDb.get()

    expect(entriesWithNoUpdatedEntry).not.toBe(entriesWithUpdatedEntry)
    expect(entriesWithNoUpdatedEntry.length).toBe(
        entriesWithUpdatedEntry.length
    )
    expect(_.find(entriesWithUpdatedEntry, entry => entry.id === entryIdToUpdate).name).toBe(newEntryName)
})
