# GET /deals

Endpoint opcional que retorna uma lista de objetos json com status igual a ganho.

## Request

`curl -X GET "http://localhost:3000/deals"`

### Success

#### HTTP Status

200

#### Body

Exemplo de resposta com os principais atributos.

```json
{
    "success": true,
    "data": [
        {
            "id": "id da oportunidade",
            "person_name": "nome do cliente",
            "title": "título da oportunidade",
            "value": "valor da oportunidade",
            "currency": "moeda",
            "wonDate": "data que a oportunidade mudou o status para ganho"
        }
    ]
}
```

### Internal Server Error

#### HTTP Status

500

#### Body

Internal Error.