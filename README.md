![Fluent DNS](https://raw.githubusercontent.com/suitux/fluent-dns/main/fluent-dns-logo.png)

Fluent DNS is a javascript based DNS that simplifies the work
of mounting a DNS server
using the library [dns2](https://github.com/song940/node-dns) and reduces it to a `npm start`.

The functionality it's basic. 
It's a DNS that actuates like /etc/hosts file. (c:\Windows\System32\Drivers\etc\hosts. on windows)

First, the DNS will search in his `./shared/db/dns-entries.json` entries. 
If the entry is not found, it will search it on a real DNS (8.8.8.8) and will resolve it.  

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
[
    {
        "id": "0416a1f04f6e25976dc75875715d85fd60c048e5",
        "name": "web.dev",
        "address": "192.168.1.148",
        "ttl": 60,
        "type": 1,
        "class": 1
    }
]
```

[Entry types](https://tools.ietf.org/html/rfc1035#section-3.2.2)

[Class types](https://tools.ietf.org/html/rfc1035#section-3.2.4)

## DNS API Endpoints

-   GET /v1/entries
-   POST /v1/entries:

```json
{
    "name": "google.es",
    "address": "192.168.1.148",
    "ttl": 60,
    "type": 1,
    "class": 1
}
```

-   PATCH /v1/entries:

```json
{
    "id": "675asd567ad56sa",
    "data": {
        "name": "google.es",
        "address": "192.168.1.148",
        "ttl": 60,
        "type": 1,
        "class": 1
    }
}
```

-   DELETE /v1/entries:
```json
{
       "id": "675asd567ad56sa"
}
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
