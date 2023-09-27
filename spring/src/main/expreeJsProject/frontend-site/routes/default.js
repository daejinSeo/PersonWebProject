const express =require('express');
const path = require('path');
const router = express.Router();

router.get('/', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'index.html');
    // res.sendFile(htmlFilePath);
    res.render('index');
});

router.get('/about', function(req, res){
    const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'about.html');
    //res.sendFile(htmlFilePath);
    res.render('about');
});

module.exports = router;