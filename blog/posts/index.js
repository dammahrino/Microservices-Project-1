const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

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
app.post('/posts', (request, response) => {
    const id = randomBytes(4).toString('hex');
    const { title } = request.body;

    posts[id] = { id, title };

    response.status(201).send(posts[id]);
});


// Set the port in which the application will be listening.
app.listen(4000, () => {
    console.log('Listening on 4000.')
})