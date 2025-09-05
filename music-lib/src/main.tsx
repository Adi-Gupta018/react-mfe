import React from 'react'
import ReactDOM from 'react-dom/client'
import MusicLibrary from './MusicLibrary'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="wrap">
      <h2>Music Library (Remote Dev View)</h2>
      <p style={{opacity:0.7, marginTop:0}}>This page is for developing the remote micro frontend. In the container app it will be loaded via Module Federation.</p>
      <MusicLibrary role="admin" />
    </div>
  </React.StrictMode>
)
