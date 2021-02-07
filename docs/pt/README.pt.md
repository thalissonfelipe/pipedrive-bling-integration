# API Rest - Integração entre as plataformas Pipedrive e Bling utilizando Node.js

Leia em outro idioma: [Inglês](../../README.md).

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
- [Docker](https://www.docker.com/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Tap](https://www.npmjs.com/package/tap)

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

## Docker

Também é possível usar o serviço utilizando docker, mas é necessário ter o docker instalado.

1. Clone o repositório e configure as variáveis de ambiente.

2. Execute o seguinte comando para criar uma imagem docker:

`sudo docker build -t linkapi/challenge .`

- docker build: cria uma imagem a partir do Dockerfile.
- -t linkapi/challenge: é o nome/tag da imagem.
- .: local onde o arquivo Dockerfile está.

3. Em seguinda, execute o seguinte comando abaixo para criar um container a partir da imagem criada:

`docker run -p 3000:3000 -d linkapi/challenge`

- docker run: cria um container e o inicializa.
- -p 3000:3000: libera a porta do container para que cada requisição de fora querendo acessar a porta 3000 do container possa também ouvir na porta 3000.
- -d detach: processo roda em background.
- linkapi/challenge: nome da imagem que estou usando para criar o container.

## Endpoints

- [GET /deals](get_deals.pt.md)
- [GET /orders](get_orders.pt.md)
- [GET /histories](get_histories.pt.md)
- [POST /orders/sync](post_orders_sync.pt.md)

## Tests

Para rodar os testes de integração é necessário ter o mongodb instalado localmente ou mudar a URI para um banco de testes a sua escolha. Isso é necessário para criar os mocks.

### Testes de integração

Execute o seguinte comando para rodar os testes de integração:

`yarn test:int` ou `npm run test:int`.

### Testes unitários

Execute o seguinte comando para rodar os teste unitários:

`yarn test:unit` ou `npm run test:unit`.

## TODO

- [ ] Corrigir a soma total dos valores por dia (separar entre tipos de moedas diferentes).
- [ ] Adicionar testes unitários para os métodos da pasta repositores.
- [ ] Adicionar testes unitários para os métodos da pasta services.
- [ ] Adicionar testes unitários para os métodos da pasta utils.
- [ ] Melhorar o tempo de resposta da rota POST /orders/sync.
- [ ] Executar a sincronização em background e dá uma resposta imediata pro usuário. E usar uma flag para saber se a sincronizção foi bem sucedida ou não.
- [x] Converter as mensagens retornadas para inglês.
