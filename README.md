# API Rest - Integração entre as plataformas Pipedrive e Bling utilizando Node.js

Desafio técnico proposto pela [LinkApi](https://linkapi.gupy.io/).

A integração pode ser realizada de duas formas:

1. Endpoint
    
    Por meio do endpoint `POST /orders/sync`.
    
2. Cron

    Utilizando o agendador de tarefas `cron`. O serviço realiza a integração uma vez por dia às 08:00 am.

## Bibliotecas e ferramentas utilizadas:

- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Node-cron](https://www.npmjs.com/package/node-cron)
- [Axios](https://github.com/axios/axios)
- [xmlbuilder2](https://www.npmjs.com/package/xmlbuilder2)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Winston](https://www.npmjs.com/package/winston)
- [Nodemon](https://nodemon.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)


## Requisitos:

- [x] Criar contas testes nas plataformas Pipedrive e Bling.

- [x] Criar uma integração entre as plataformas Pipedrive e Bling. (A integração deve buscar as oportunidades com status igual a ganho no Pipedrive, depois inseri-las como pedido no Bling).

- [x] Criar banco de dados mongo, existem serviços como MongoDB Atlas para criar de graça

- [x] Criar uma collection no banco de dados MongoDB agregando as oportunidades inseridas no Bling por dia e valor total.

- [x] Criar endpoint para trazer os dados consolidados da collection do MongoDB.

## Configuraçes

### Contas

É necessário criar uma conta nas plataformas Pipedrive, Bling e MongoDB Atlas.

- [Pipedrive](https://www.pipedrive.com/pt)
- [Bling](https://www.bling.com.br/home)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Dependências

- [Node.js v12.20.1](https://nodejs.org/en/blog/release/v12.20.1/)
- [yarn](https://yarnpkg.com/)
- [npm](https://www.npmjs.com/)

Clone este repositório e na pasta raiz execute um dos seguintes comandos:

`yarn install`

`npm install`

### Variáveis de ambiente

Crie um arquivo .env e preencha com suas credenciais. Use o arquivo .env.example como referência.

### Executar

Pronto, basta executar um dos seguintes comandos para iniciar o serviço:

`yarn start` ou `yarn dev`

`npm start` ou `npm run dev`

## Endpoints

### GET /deals

Endpoint opcional que retorna uma lista de objetos json com status igual a ganho.

#### Request

`curl -X GET "http://localhost:3000/deals"`

##### Success

###### HTTP Status

200

###### Body

Exemplo de resposta com os principais atributos.

```json
[
    {
        "id": "id da oportunidade",
        "person_name": "nome do cliente",
        "title": "título da oportunidade",
        "value": "valor da oportunidade",
        "currency": "moeda",
        "wonDate": "data que a oportunidade mudou o status para ganho"
    }
]
```

##### Internal Error

###### HTTP Status

500

###### Body

Internal Error.

### GET /orders

Endpoint que retorna uma lista de objetos json com os dados agrupados por dia da ordem pedido e o seu valor total.

#### Request

`curl -X GET "http://localhost:3000/orders"`

##### Success

###### HTTP Status

200

###### Body

```json
[
    {
        "date": "2021-02-03",
        "totalAmount": "10000"
    }
]
```

##### Internal Error

###### HTTP Status

500

###### Body

Internal Error.

### POST /orders/sync

Endpoint utilizado para sincronizar as plataformas Pipedrive e Bling. Em caso de sucesso a API pode retornar dois tipos de resposta.
Se novos pedidos foram ou não criados.

#### Request

`curl -X POST "http://localhost:3000/orders/sync"`

##### Success

###### HTTP Status

200

###### Body

- Sincronização realizada! Novos pedidos foram criados.
- Sincronização realizada! Nenhum pedido foi criado.

##### Internal Error

###### HTTP Status

500

###### Body

Internal Error.

### GET /histories

Endpoint utilizado para registrar a data e hora de cada integração.
É basicamente uma nova coleção no mongo que contém o timestamp das integrações realizadas pelo cron ou pelo endpoint.

#### Request

`curl -X GET "http://localhost:3000/histories"`

##### Success

###### HTTP Status

200

###### Body

```json
{
    "timestamps": [
        "2020-02-03 08:00:00",
        "2020-02-03 09:36:23"
    ]
}
```

##### Internal Error

###### HTTP Status

500

###### Body

Internal Error.

