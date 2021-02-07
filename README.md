# API Rest - Integration between Pipedrive and Bling platforms using Node.js

Read this in other language: [Portuguese](docs/pt/README.pt.md).

Technical challenge proposed by [LinkApi](https://linkapi.gupy.io/).

Integration can be accomplished in two ways:

1. Using an endpoint:
    
    Through the endpoint `POST /orders/sync`.
    
2. Using cron:

    Using the `cron` task scheduler. The service performs the integration once a day at 08:00 am.

## Libraries and tools used

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

## Requirements

- [x] Create test accounts on the Pipedrive and Bling platforms.

- [x] Create an integration between Pipedrive and Bling platforms. (The integration must search for deals with status equal to won in Pipedrive, then insert them as order in Bling).

- [x] Create mongo database, there are services like MongoDB Atlas to create for free.

- [x] Create a collection in the MongoDB database adding the opportunities inserted in Bling by day and total value.

- [x] Create endpoint to bring the consolidated data from the MongoDB collection.

## Settings

### Accounts

It is necessary to create an account on the Pipedrive, Bling and MongoDB Atlas platforms.

- [Pipedrive](https://www.pipedrive.com/pt)
- [Bling](https://www.bling.com.br/home)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Dependencies

- [Node.js v12.20.1](https://nodejs.org/en/blog/release/v12.20.1/)
- [yarn](https://yarnpkg.com/)
- [npm](https://www.npmjs.com/)

Clone this repository and in the root folder run one of the following commands:

`yarn install` (recommended)

`npm install`

### Environment variables

Create an .env file and fill in with your credentials. Use the .env.example file as a reference.

### How to run

Just run one of the following commands to start the service:

`yarn start` or `yarn dev` (recommended)

`npm start` or `npm run dev`

## Docker

It is also possible to use the service using the docker, but it is necessary to have the docker installed.

### Steps

1. Clone this repository and set the environment variables.

2. Run the following command to create a docker image:

`sudo docker build -t linkapi/challenge .`

- docker build: creates an image from the Dockerfile
- -t linkapi/challenge: is the name/tag of the image
- .: location where the Dockerfile file is

3. Then, execute the following command below to create a container from the created image:

`docker run -p 3000:3000 -d linkapi/challenge`

- docker run: creates a container and initializes it
- -p 3000:3000: releases the container port so that each request from outside wanting to access the container port 3000 can also listen on port 3000
- -d detach: process runs in the background
- linkapi/challenge: name of the image I'm using to create the container

Now the service is running on port 3000.

## Endpoints

- [GET /deals](docs/get_deals.md)
- [GET /orders](docs/get_orders.md)
- [GET /histories](docs/get_histories.md)
- [POST /orders/sync](docs/post_orders_sync.md)

## Tests

To run the integration tests it is necessary to have mongodb installed locally or to it is necessary to change the URI to a database test of your choice. This is necessary to create the mocks.

### Integration tests

Run one of the following commands to run the integration tests:

`yarn test:int` or `npm run test:int`.

### Unit tests

Run one of the following commands to run the unit tests:

`yarn test:unit` or `npm run test:unit`.

## TODO

- [ ] Correct the total sum of values per day (separate between different types of currencies).
- [ ] Add unit tests for the methods in the repositories folder.
- [ ] Add unit tests for the methods in the services folder.
- [ ] Add unit tests for the utils folder methods.
- [ ] Improve the response time of the POST / orders / sync route.
- [ ] Perform the synchronization task in background and give an immediate response to the user. (Hint: use a flag to find out if the synchronization was successful or not).
- [x] Convert the returned messages to English language.
