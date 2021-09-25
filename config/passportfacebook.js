const passport = require('passport')

const User = require('../models/user')

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "https://save4goals.herokuapp.com/auth/facebook/saveup",
    profileFields: ['id', 'displayName','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('this is the profile from passport-facebook')
    console.log(profile)
    User.findOne({ facebookId: profile.id}, function(err, user){
        if (err) return cb(err);
        if (user) {
            return cb(null, user)
        } else {
            var newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                facebookId: profile.id
            });
            newUser.save(function(err) {
                if (err) return cb(err)
                return cb(null, newUser)
            });
        }
    });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        done(err, user)
    })
});