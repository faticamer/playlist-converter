const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5555/auth/google/callback",
    passReqToCallback: true,
    prompt: 'consent',
    scope: [
     'https://www.googleapis.com/auth/youtubepartner',
     'https://www.googleapis.com/auth/youtube',
     'https://www.googleapis.com/auth/youtube.force-ssl'
    ]
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log('Access Token for Google acc: ', accessToken)
    process.nextTick(function () {
      return done(null, [{ accessToken : accessToken }, { refreshToken : refreshToken }, { profile : profile}])
    })
  }
));