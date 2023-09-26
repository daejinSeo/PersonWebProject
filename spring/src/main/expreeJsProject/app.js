const path = require('path');

const fs = require('fs');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'frontend-site', 'views'));
app.set('view engine', 'ejs');

app.use(express.static('frontend-site/public'));
app.use(express.urlencoded({extented: false}));

app.get('/', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'index.html');
    // res.sendFile(htmlFilePath);
    res.render('index');
});

app.get('/restaurants', function(req, res){
    //const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'restaurants.html');
    //res.sendFile(htmlFilePath);
    const filePath = path.join(__dirname, 'frontend-site','data', 'restaurantData.json');
    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);


    res.render('restaurants',{numberOfRestaurants: storeRestaurants.length, restaurants: storeRestaurants} );
});

app.get('/recommend', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'recommend.html');
    // res.sendFile(htmlFilePath);
    res.render('recommend');
});

app.post('/recommend', function(req, res){
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'frontend-site','data', 'restaurantData.json');
    const fileData = fs.readFileSync(filePath);
    const storeRestaurants = JSON.parse(fileData);

    storeRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storeRestaurants));
    res.render('confirm');
});
    //res.redirect('/confirm');

app.get('/confirm', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'confirm.html');
    //res.sendFile(htmlFilePath);
    res.render('confirm');
});

app.get('/about', function(req, res){
    const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'about.html');
    //res.sendFile(htmlFilePath);
    res.render('about');
});

app.listen(3000);