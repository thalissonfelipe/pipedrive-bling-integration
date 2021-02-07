# GET /orders

Endpoint que retorna uma lista de objetos json com os dados agrupados por dia da ordem pedido e o seu valor total.

## Request

`curl -X GET "http://localhost:3000/orders"`

### Success

#### HTTP Status

200

#### Body

```json
[
    {
        "date": "2021-02-03",
        "totalAmount": "10000"
    }
]
```

### Internal Server Error

#### HTTP Status

500

#### Body

Internal Error.