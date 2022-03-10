const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events_bus_port = 4005;

app.post('/events', (request, response) => {
    const event = request.body;

    console.log(`${event.type} event received.`)

    // Retransmit the event received to the rest of the services
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    response.send({ status: 'OK'})
});

app.listen(events_bus_port, () => {
    console.log(`[EVENT_BUS] Listening on ${events_bus_port}`);
})