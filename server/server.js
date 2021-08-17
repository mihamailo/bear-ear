const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SwpotifyWebAPI = require('spotify-web-api-node');
const lyricsFinder = require('lyrics-finder');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  console.log(refreshToken);
  const spotifyApi = new SwpotifyWebAPI({
    redirectUri: 'http://localhost:3000',
    clientId: 'fa0d93902a564439a586786b115df360',
    clientSecret: '6f33b27e0ac74e9ab634f653fa499f5c',
    refreshToken
  })
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SwpotifyWebAPI({
    redirectUri: 'http://localhost:3000',
    clientId: 'fa0d93902a564439a586786b115df360',
    clientSecret: '6f33b27e0ac74e9ab634f653fa499f5c'
  })
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400)
    })
})

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.listen(3001)