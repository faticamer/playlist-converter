const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:5555/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      done(null, { accessToken, profile })
    }
  )
);
