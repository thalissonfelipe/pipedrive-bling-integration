const app = require('./app');
const PORT = process.env.PORT | 3000;

app.get('/', (req, res) => {
    return res.status(200).send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
