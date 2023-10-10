const express = require('express');

// const adminController = require('../controllers/admin.controller');

function getProducts(req, res){
    console.log("all-products render");
    res.render('admin/products/all-products');
}

function getNewProduct(req, res){
    console.log("new-product render");
    res.render('admin/products/new-product');
}

function createNewProduct(req, res){
    console.log(req.body);
    console.log(req.file);

    res.redirect('/admin/products');
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct
};