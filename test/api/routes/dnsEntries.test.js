const request = require('supertest')
const fs = require('fs')
require('jest-extended')

const dnsEntriesFilePath = './test/api/routes/files/dnsEntries.json'
process.env.DNS_ENTRIES_FILE_PATH = dnsEntriesFilePath

let app = {}

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

describe('Dns Entries Express Routes', () => {
    beforeEach(() => {
        fs.writeFileSync(dnsEntriesFilePath, JSON.stringify(dnsFileEntries))
        app = require('../../../api')
    })

    afterEach(() => {
        fs.unlinkSync(dnsEntriesFilePath)
    })

    test('Given the DNS Entries API, when we get all the entries, it should return all the entries', (done) => {
        request(app)
            .get('/v1/entries')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.length).not.toBeLessThan(1)
                expect(response.body).toEqual(
                    expect.arrayContaining(dnsFileEntries)
                )
                done()
            })
    })

    test('Given the DNS Entries API, when we post a new entry, it should return 200 and the posted entry', (done) => {
        const newEntry = {
            name: 'new.com',
            address: '8.8.4.4',
            ttl: 60,
            type: 'A',
            class: 'IN',
        }

        request(app)
            .post('/v1/entries')
            .send(newEntry)
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.name).toEqual(newEntry.name)
                done()
            })
    })

    test('Given the DNS Entries API, when we post a new entry that is already in the DDBB, it should return 200 and the posted entry', (done) => {
        const newEntry = {
            name: 'lol',
            address: '8.8.8.8',
            ttl: 60,
            type: 'A',
            class: 'IN',
        }

        request(app)
            .post('/v1/entries')
            .send(newEntry)
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.statusCode).toBe(400)
                done()
            })
    })

    test('Given the DNS Entries API, when we delete an existing entry, then it should be deleted', async (done) => {
        const entryToDelete = dnsFileEntries[0]

        request(app)
            .delete('/v1/entries')
            .send({ id: entryToDelete.id })
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.text).toEqual(entryToDelete.id)
                done()
            })
    })
})
