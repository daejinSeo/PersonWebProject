const path = require('path');
const express = require('express');
const defaultRoutes = require('./frontend-site/routes/default');
const restaurantsRoutes = require('./frontend-site/routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'frontend-site', 'views'));
app.set('view engine', 'ejs');

app.use(express.static('frontend-site/public'));
app.use(express.urlencoded({extented: false}));

app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

app.listen(3000);