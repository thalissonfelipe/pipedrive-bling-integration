# GET /histories

Endpoint utilizado para recuperar a data e hora de cada integração.
É basicamente uma nova coleção no mongo que contém o timestamp das integrações realizadas pelo cron ou pelo endpoint.

## Request

`curl -X GET "http://localhost:3000/histories"`

### Success

#### HTTP Status

200

#### Body

```json
{
    "timestamps": [
        "2020-02-03 08:00:00",
        "2020-02-03 09:36:23"
    ]
}
```

### Internal Server Error

#### HTTP Status

500

#### Body

Internal Error.