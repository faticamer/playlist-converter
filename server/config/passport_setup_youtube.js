const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user);
});
  
  passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    callbackURL: "http://localhost:5555/auth/youtube/callback",
    prompt: 'consent',
    scope: [
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl'
    ]
  },
  function(accessToken, refreshToken, profile, cb) {
    done(null, { accessToken, refreshToken, profile, cb })
  }
));