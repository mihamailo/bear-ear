import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      play={play}
      token={accessToken}
      showSaveIcon
      callback={state => !state.isPlaying ? setPlay(false) : null}
      autoplay={true}
      uris={trackUri ? [trackUri] : []}
    />
  )
}
