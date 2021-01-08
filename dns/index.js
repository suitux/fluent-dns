const dns = require('dns2');

const { Packet } = dns;

const server = dns.createServer((request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request);
    const [ question ] = request.questions;
    const { name } = question;

    let address = ''

    if(name === 'casas.trovit.es.vagrant.devel')
        address = '192.168.1.148'
    else if(name === 'rd.trovit.com.vagrant.devel')
        address = '192.168.56.110'
    else if(name === 'rd.clk.thribee.com.vagrant.devel')
        address = '192.168.56.110'
    else if(name === 'accounts.trovit.com.vagrant.devel')
        address = '127.0.0.1'
    else if(name === 'api.trovit.com.vagrant.devel')
        address = '192.168.56.110'


    response.answers.push({
        name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 1,
        address
    });
    send(response);
});

server.on('request', (request, response, rinfo) => {
    console.log(request.header.id, request.questions[0]);
});

server.listen(53);

console.log("LISTENING DNS");
