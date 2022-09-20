require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [
    {
        username: 'kwame',
        title: 'post 1'
    },
    {
        username: 'ama',
        title: 'post 2'
    }
];

app.get('/posts', getAuthorization, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

// Middleware
function getAuthorization (req, res, next) {
    const authHeader = req.headers['authorization'];
    // athorization from the header has a string: 'Bearer xyslzlz (this is the token)'
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

app.listen(port, () => console.log(`server is listening on port ${port}`));

