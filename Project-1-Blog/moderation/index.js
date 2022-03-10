const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const moderate_service_port = 4003;

app.post('/events', (request, response) => {

});

app.listen(moderate_service_port, () => {
    console.log('[MODERATE_SERVICE] Listening on', moderate_service_port);
})
