const DnsDb = require('../../../model/db/dnsDb')
const fs = require('fs')
const _ = require('lodash')


let dnsDb
const dnsEntriesFile = './test/model/db/files/dnsEntries.json'

const dnsFileEntries = [
    { name: 'lol', address: '8.8.8.8', ttl: 60 },
    { name: 'test', address: '8.8.8.8', ttl: 60 },
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
    }

    const oldEntries = dnsDb.get()

    dnsDb.add(entry)

    const newEntries = dnsDb.get()

    expect(oldEntries).not.toBe(newEntries)
    expect(oldEntries.length).toBeLessThan(newEntries.length)
})

test('Given a loaded dns database with entries, when we add one existing entry, the entry wont be added', () => {
    const entry = {
        name: 'lol',
        address: '8.8.8.8',
        ttl: 60,
    }

    const oldEntries = dnsDb.get()

    dnsDb.add(entry)

    const newEntries = dnsDb.get()

    expect(oldEntries.length).toBe(newEntries.length)
})

test('Given a loaded dns database with entries, when we remove entry, the entry must be removed', () => {
    const entry = {
        name: 'to_delete_entry',
        address: '8.8.8.8',
        ttl: 60,
    }

    dnsDb.add(entry)

    const oldEntries = dnsDb.get()

    dnsDb.remove(entry)

    const newEntries = dnsDb.get()

    expect(oldEntries).not.toBe(newEntries)
    expect(newEntries.length).toBeLessThan(oldEntries.length)
})

test('Given a loaded dns database with entries, when we update a entry, then the entry must be updated', () => {

    const entryToUpdate = dnsFileEntries[0]
    const entry = {
        name: entryToUpdate.name,
        address: '127.0.0.1',
        ttl: 6000,
    }

    const entriesWithNoUpdatedEntry = dnsDb.get()

    dnsDb.update(entryToUpdate, entry)

    const entriesWithUpdatedEntry = dnsDb.get()

    expect(entriesWithNoUpdatedEntry).not.toBe(entriesWithUpdatedEntry)
    expect(entriesWithNoUpdatedEntry.length).toBe(entriesWithUpdatedEntry.length)
    expect(_.some(entriesWithUpdatedEntry, entry => entry === entryToUpdate)).toBeFalsy()


})
