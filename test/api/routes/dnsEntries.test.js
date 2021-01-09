const request = require('supertest')
const app = require('../../../api')

describe('Dns Entries Express Routes', () => {
    test('Given the DNS Entries API, when we get all the entries, it should return all the entries', () => {
        return request(app)
            .get('/v1/entries')
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.length).not.toBeLessThan(1)
            })
    })
})
