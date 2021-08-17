import React from 'react'

export default function TrackItem({ track, onChooseTrack }) {
  return (
    <div
      key={track.uri}
      className="d-flex align-items-center mt-2"
      style={{ cursor: 'pointer' }}
      onClick={() => onChooseTrack(track)}
    >
      <img src={track.albumImg} alt="" />
      <div className="ml-2">{track.title}</div>
    </div>
  )
}
