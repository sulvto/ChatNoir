var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // views/chatnoir/main.ejs
    res.render('chatnoir/main', {title: 'Chat Noir'});
});

router.get('/cat', function (req, res, next) {
    // views/chatnoir/animation.ejs
    res.render('chatnoir/animation', {title: 'Chat Noir Animation'});
});

router.get('/bezier-curve', function (req, res, next) {
    // views/chatnoir/bezier-curve.ejs
    res.render('chatnoir/bezier-curve', {title: 'Chat Noir Animation'});
});


module.exports = router;
