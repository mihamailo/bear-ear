import React from 'react'

import { Container } from 'react-bootstrap'

const BASE_URL = "https://accounts.spotify.com/authorize?client_id=fa0d93902a564439a586786b115df360&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={BASE_URL}>
        Login With Spotify
      </a>
    </Container>
  )
}

export { Login }