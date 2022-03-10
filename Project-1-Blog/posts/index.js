const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Acting as middleware
app.use(bodyParser.json());
app.use(cors());


// Object for storing locally the posts
const posts = {};

// Route for retrieving the posts
app.get('/posts', (request, response) => {
    response.send(posts);
});

// Route for posting 'posts'
app.post('/posts', async (request, response) => {
    const id = randomBytes(4).toString('hex');
    const { title } = request.body;

    posts[id] = { id, title };

    // We create an Event Emitter everytime a new post is created.
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    response.status(201).send(posts[id]);
});

// Adding Post request handler
app.post('/events', (request, response) => {
    console.log('Received event', request.body.type);

    response.send({}).status(200);
});


// Set the port in which the application will be listening.
app.listen(4000, () => {
    console.log('Listening on 4000.')
})