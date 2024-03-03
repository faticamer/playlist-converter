const express = require('express')
const authRoute = require('./routes/auth_route')
const youtubeRoute = require('./routes/youtube_route')
const spotifyRoute = require('./routes/spotify_route')
const passport = require('passport')
const passportSetup = require('./config/passport_setup')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

// Enable CORS for your frontend running on port 5173
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// NOTE: There is a problem with cookie-session and passport (more specifically req.session.regenerate)
// If you want to incorporate cookie-session instead of express-session used here, uninstall passport and run
// npm install passport@0.5

app.use(
    session({
      secret: process.env.MY_SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        sameSite: 'strict'
      }
    })
);

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
    return res.status(234).send('Successful')
})

app.use('/auth', authRoute.router)

app.use('/youtube', youtubeRoute.router)

app.use('/spotify', spotifyRoute.router)

app.listen(port, function () {
    console.log(`Server has started on https://localhost:${port}`);
})