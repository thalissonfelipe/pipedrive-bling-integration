# GET /deals

Optional endpoint that returns a list of json objects with status equal to won.

## Request

`curl -X GET "http://localhost:3000/deals"`

### Success

#### HTTP Status

200

#### Body

Example of answer with the main attributes.

```json
{
    "success": true,
    "data": [
        {
            "id": "deal id",
            "person_name": "client name",
            "title": "deal title",
            "value": "deal value",
            "currency": "currency",
            "wonDate": "date the opportunity changed status to won"
        }
    ]
}
```

### Internal Server Error

#### HTTP Status

500

#### Body

Internal Error.
