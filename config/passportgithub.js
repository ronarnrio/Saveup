const passport = require('passport')

const User = require('../models/user')

const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "https://save4goals.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('this is the profile from passport-github')
    console.log(profile)
    User.findOne({ githubId: profile.id}, function(err, user){
        if (err) return cb(err);
        if (user) {
            return cb(null, user)
        } else {
            var newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                githubId: profile.id
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