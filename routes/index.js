const express = require('express');
const router = express.Router();
const passport = require('passport')
const indexCtrl = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '$aveUp | Homepage' });
});

router.get('/finance', indexCtrl.financeApis)

router.get('/finance/bitcoin', indexCtrl.bitcoinApi)

router.get('/finance/stocks', indexCtrl.stockApiPage)

router.get('/finance/stockdetails', indexCtrl.stockApi)

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email']}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/goals/showall',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
})

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/goals/showall');
});

router.get('/auth/facebook',
  
  passport.authenticate('facebook', { scope: ['public_profile', 'email']}));

router.get('/auth/facebook/saveup',
  passport.authenticate('facebook', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/goals/showall');
});
  
module.exports = router;