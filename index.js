require('./dns')
require('./api')

const DnsDb = require('./model/db/dnsDb')

const database = new DnsDb()
