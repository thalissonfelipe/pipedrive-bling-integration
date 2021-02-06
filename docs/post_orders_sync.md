# POST /orders/sync

Endpoint utilizado para sincronizar as plataformas Pipedrive e Bling. Em caso de sucesso a API pode retornar dois tipos de resposta.
Se novos pedidos foram ou não criados.

## Request

`curl -X POST "http://localhost:3000/orders/sync"`

### Success

#### HTTP Status

200

#### Body

- Sincronização realizada! Novos pedidos foram criados.
- Sincronização realizada! Nenhum pedido foi criado.

### Internal Server Error

#### HTTP Status

500

#### Body

Internal Error.