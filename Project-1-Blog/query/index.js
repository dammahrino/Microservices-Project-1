const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const query_service_port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (request, response) => {

});

app.post('/events', (request, response) => {

});

app.listen(query_service_port, () => {
    console.log('Listening on', query_service_port);
})
