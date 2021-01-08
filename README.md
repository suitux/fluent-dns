# Fluent DNS

Fluent DNS is a javascript based DNS that simplifies the work of mounting a DNS server and reduces it to a `npm start`.

## Installation

Download this repository.

```
git clone https://github.com/suitux/fluent-dns
```

## Usage

1. Modify `./shared/db/dns-entries.json` with your DNS entries.
2. Start with:

```
npm start
```

## dns-entries.json structure

```json
{
    "name": "google.es",
    "address": "192.168.1.148",
    "ttl": 60,
    "type": "A",
    "class": "IN"
}
```

#### Entry types: 

```
A, NS, MD, MF, CNAME, SOA, MB, MG, MR, NULL, WKS, PTR, HINFO, MINFO, MX, TXT, AAAA, SRV, EDNS, SPF, AXFR, MAILB, MAILA, ANY, CAA
```

#### Class types: 
```
IN, CS, CH, HS, ANY
```

## Test

```
npm test
```


## Contributing

Pull requests are welcome :)

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
