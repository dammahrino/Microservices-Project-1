const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const query_service_port = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

/**
 * posts = {
 *   '87wehifu': {
 *       id: '87wehifu',
 *       title: 'Post Title',
 *       comments: [
 *          { id: '87gwefi', content: 'Comments' }
 *       ]
 *    }
 * }
 */

const posts = {};

app.get('/posts', (request, response) => {
    response.status(200).send(posts);
});

app.post('/events', (request, response) => {
    const { type, data } = request.body;

    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id, 
            title,
            comments: []
        }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        
        const post = posts[postId];
        post.comments.push({ id, content});
    }

    console.log(posts)
    response.status(201).send({});
});

app.listen(query_service_port, () => {
    console.log('[QUERY_SERVICE] Listening on', query_service_port);
})
