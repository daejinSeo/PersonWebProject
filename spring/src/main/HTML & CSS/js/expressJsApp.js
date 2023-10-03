const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extented: false}));

app.get('/', function(req, res){
    res.send('<form action="/store-user" method="POST"><label>Your name: </label><input type="text" name="username"><button>Submit</button></form>');
});

app.post('/store-user', function(req, res){
    const userName = req.body.username;
    // console.log(userName);
    const filePath = path.join('..', 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));
    res.send('<h1>Username stored!</h1>');
});

app.get('/users', function(req, res){
    const filePath = path.join('..', 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    let responseData = '<ul>';

    for (const user of existingUsers){
        responseData += '<li>' + user + '</li>';
    }

    responseData += '</ul>';

    res.send(responseData);
});

app.listen(3000);