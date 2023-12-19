const express = require('express');
const session = require('express-session');

const app = express();
var path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
    secret: "anything",
    resave: false,
    saveUninitialized: true,
    })
);

const homeRouter = require('./routes/home.routes');
const cartRouter = require('./routes/cart.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use('/home', homeRouter);
app.use('/cart', cartRouter);

app.listen(3000);
