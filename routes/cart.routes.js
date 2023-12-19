var express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('cart', {        
    });
});

router.post('/add/:productName', (req, res) => {
    const { productName } = req.params;
    if (productName) {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.session.cart.push(productName);
    }
    res.json(req.session.cart);
  });


router.post('/remove/:productName', (req, res) => {
    const { productName } = req.params;
    if (productName && req.session.cart) {
        const index = req.session.cart.indexOf(productName);
        if (index != -1) {
            req.session.cart.splice(index, 1);
        }
    }
    res.json(req.session.cart);
});

router.get('/getAll', (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.json(req.session.cart);    
});

module.exports = router;