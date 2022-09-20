require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4001;

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    // Authenticate User
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken, refreshToken })
});

// In a real case scenario consider making expiresIn longer e.g. 15 - 30 mins
function generateAccessToken(user) {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.listen(port, () => console.log(`server is listening on port ${port}`));

