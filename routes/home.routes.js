var express = require('express');
const data = require('../data/mydata');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home', {        
    });
});

router.get('/getCategories', (req, res) => {
    const categories = data.categories;  
    res.json(categories);
});

router.get('/getProducts/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    const category = data.categories.find(cat => cat.name === categoryName);
    if (!category) {
        return res.status(404).json({ error: 'Kategorija nije pronađena' });
    }
    const products = category.products;
    res.json(products);
});

module.exports = router;