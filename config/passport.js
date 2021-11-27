const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = function(passport) {
    passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },

    /**
     * 
     * @param {*} accessToken 
     * @param {*} refreshToken 
     * @param {*} profile - the profile of the user we return
     * @param {*} done - the callback that is called when the login works
     */
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile)
      //console.log(profile.emails[0].value) (this is example to get the email on the account)

      const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      }

      try {
       let user = await User.findOne({googleID: profile.id})

        if(user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }

      } catch(e) {
        console.error(e)
      }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}