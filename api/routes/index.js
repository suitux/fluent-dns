module.exports = [
    {
        path: '/v1/hosts',
        router: require('./hosts')
    },
    {
        path: '/v1/entries',
        router: require('./dnsEntries')
    }
]
