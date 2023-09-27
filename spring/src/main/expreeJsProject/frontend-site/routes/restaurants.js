const express = require('express');
const uuid = require('uuid');
const resData = require('../util/restaurant-file');
const router = express.Router();

router.get('/restaurants', function(req, res){
    //const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'restaurants.html');
    //res.sendFile(htmlFilePath);
    let order = req.query.order;
    let nextOrder = 'desc';
    const storeRestaurants = resData.getStoreRestaurant();

    if (order !== 'asc' && order !== 'desc' ){
        order = 'asc'
    }

    if (order === 'desc'){
        nextOrder = 'asc';
    }

    storeRestaurants.sort(function(resA, resB) {
        if(order === 'asc' && resA.name > resB.name){
            return 1
        }
        else if (order ==='desc' && resB.name > resA.name){
            return 1
        }
        return -1
    });

    res.render('restaurants',{
        numberOfRestaurants: storeRestaurants.length, 
        restaurants: storeRestaurants,
        curOrder: nextOrder
    });
});

router.get('/restaurants/:id', function(req, res){
    const restaurantsId = req.params.id;

    const storeRestaurants = resData.getStoreRestaurant();
    
    for(const restaurant of storeRestaurants ){
        if (restaurant.id === restaurantsId){
            return res.render('restaurant-detail', { restaurant: restaurant});
        }
    }

    return res.render('404');
    
}); 

router.get('/recommend', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'recommend.html');
    // res.sendFile(htmlFilePath);
    res.render('recommend');
});

router.post('/recommend', function(req, res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const restaurants = resData.getStoreRestaurants();
    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.render('confirm');
});
    //res.redirect('/confirm');

router.get('/confirm', function(req, res){
    // const htmlFilePath = path.join(__dirname, 'frontend-site', 'views', 'confirm.html');
    //res.sendFile(htmlFilePath);
    res.render('confirm');
});


module.exports = router;