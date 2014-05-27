var mongoose = require('mongoose'),
User = require('../model/account'),
FacebookStrategy = require('passport-facebook').Strategy,
TwitterStrategy = require('passport-twitter').Strategy,
InstagramStrategy = require('passport-instagram').Strategy,
LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport,fbID,fbSecret,twitterKey,twitterSecret,instagramID,instagramSecret) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, '-salt -hashed_password', function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: fbID,
        clientSecret: fbSecret,
        callbackURL: '/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username || profile.emails[0].value.split('@')[0],
                    provider: 'facebook',
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: twitterKey,
        consumerSecret: twitterSecret,
        callbackURL: '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({
            'twitter.id_str': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    provider: 'twitter',
                    twitter: profile._json,
                    roles: ['authenticated']
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
    ));

    passport.use(new InstagramStrategy({
        clientID: instagramID,
        clientSecret: instagramSecret,
        callbackURL: '/auth/instagram/callback'
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({
            'twitter.id_str': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    username: profile.username,
                    provider: 'twitter',
                    twitter: profile._json,
                    roles: ['authenticated']
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
    ));

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({
            email: email
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }
    ));
};