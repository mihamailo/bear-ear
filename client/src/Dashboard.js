import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackItem from './TrackItem'
import Player from './Player'
import axios from 'axios'


const spotify = new SpotifyWebApi({
  clientId: 'fa0d93902a564439a586786b115df360'
})

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [res, setRes] = useState([])
  const [trackPlaying, setTrackPlaying] = useState()
  const [lyrics, setLyrics] = useState('')

  function onChooseTrack(track) {
    setTrackPlaying(track)
  }

  const visible = lyrics ? '0' : '-100% ';
  document.querySelector('body').style.overflow = lyrics ? 'hidden' : '';

  const hidePopup = () => {
    setLyrics('')
  }

  useEffect(() => {
    if (!trackPlaying) return

    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: trackPlaying.title,
          artist: trackPlaying.artist,
        }
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [trackPlaying])

  useEffect(() => {
    if (!accessToken) return
    spotify.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    if (!search) return

    let cancel = false

    spotify
      .searchTracks(search)
      .then(res => {
        if (cancel) return
        const tracks = res.body.tracks.items;

        setRes(
          tracks.map(track => {
            const smallestImg = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest
              }
            )
            return {
              title: track.name,
              artists: track.artists,
              uri: track.uri,
              albumImg: smallestImg.url
            }
          })
        )
        return () => cancel = true
      })
  }, [search, accessToken])

  return (
    <Container style={{ marginBottom: '55px' }}>
      <Form.Control
        className='mt-2'
        type="search"
        placeholder='Songs/Artists'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {res.map(track =>
        <TrackItem
          track={track}
          onChooseTrack={onChooseTrack}
        />)
      }
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: "100%", zIndex: '1' }}>
        <Player
          accessToken={accessToken}
          trackUri={trackPlaying?.uri} />
      </div>
      <div className="popup text-center" style={{ position: 'fixed', bottom: visible, left: '50%', transform: 'translateX(-50%)', width: "100%", height: "100%", transition: 'all .4s ease', background: '#fff', fontSize: '18px', lineHeight: '20px', whiteSpace: "pre" }}>
        <div onClick={hidePopup} className="overlay" style={{ position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', background: 'rgba(0, 0, 0, 0.8)' }}></div>
        <div style={{ position: 'fixed', height: '100%', width: '60vw', top: 0, left: '50%', transform: 'translate(-50%,0)', zIndex: '1', background: '#fff', overflowY: 'auto', padding: '40px 70px 90px 70px' }}>
          {lyrics}
        </div>
      </div>
    </Container >
  )
}

export { Dashboard }