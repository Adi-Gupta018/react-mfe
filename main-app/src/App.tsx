// import React, { Suspense } from 'react'
// import { AuthProvider, useAuth } from './auth'

// // Federated import resolved at runtime
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

// const Toolbar: React.FC = () => {
//   const { role, login, logout } = useAuth()
//   return (
//     <div className="toolbar">
//       <b>Main App (Container)</b>
//       <div className="spacer"></div>
//       {role ? (
//         <>
//           <span>Role: <code>{role}</code></span>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => login('user')}>Login as User</button>
//           <button onClick={() => login('admin')}>Login as Admin</button>
//         </>
//       )}
//     </div>
//   )
// }

// const Home: React.FC = () => {
//   const { role } = useAuth()
//   return (
//     <div className="container">
//       <Suspense fallback={<div className="card">Loading Music Library…</div>}>
//         <MusicLibrary role={role ?? 'user'} />
//       </Suspense>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toolbar />
//       <Home />
//     </AuthProvider>
//   )
// }

// import React, { Suspense } from 'react'
// import { AuthProvider, useAuth } from './auth'

// // @ts-ignore - resolved by Module Federation at runtime
// const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

// class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
//   constructor(props: any) { super(props); this.state = { error: null } }
//   static getDerivedStateFromError(error: any) { return { error } }
//   render() {
//     if (this.state.error) {
//       return (
//         <div className="card" style={{ borderColor: '#f66' }}>
//           <h3 style={{ marginTop: 0 }}>Micro Frontend failed to load</h3>
//           <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
//           <p>Open DevTools → Console & Network. Check <code>remoteEntry.js</code> URL and that <b>music-lib</b> is running.</p>
//         </div>
//       )
//     }
//     return this.props.children
//   }
// }

// const Toolbar: React.FC = () => {
//   const { role, login, logout } = useAuth()
//   return (
//     <div className="toolbar">
//       <b>Main App (Container)</b>
//       <div className="spacer" />
//       {role ? (
//         <>
//           <span>Role: <code>{role}</code></span>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <button onClick={() => login('user')}>Login as User</button>
//           <button onClick={() => login('admin')}>Login as Admin</button>
//         </>
//       )}
//     </div>
//   )
// }

// const Home: React.FC = () => {
//   const { role } = useAuth()
//   return (
//     <div className="container">
//       <ErrorBoundary>
//         <Suspense fallback={<div className="card">Loading Music Library…</div>}>
//           <MusicLibrary role={role ?? 'user'} />
//         </Suspense>
//       </ErrorBoundary>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toolbar />
//       <Home />
//     </AuthProvider>
//   )
// }

import React, { Suspense } from 'react'
import { AuthProvider, useAuth } from './auth'
import { SongsProvider, useSongsStore } from './songsStore'
import './styles.css'

// @ts-ignore – provided by Module Federation at runtime
const MusicLibrary = React.lazy(() => import('music_lib/MusicLibrary'))

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: any) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error: any) { return { error } }
  render() { return this.state.error
    ? <div className="card" style={{ borderColor: '#f66' }}>
        <h3 style={{ marginTop: 0 }}>Micro Frontend failed to load</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
      </div>
    : this.props.children }
}

const Toolbar: React.FC = () => {
  const { role, login, logout } = useAuth()
  return (
    <div className="toolbar">
      <b>Main App (Container)</b>
      <div className="spacer" />
      {role
        ? (<><span>Role: <code>{role}</code></span><button onClick={logout}>Logout</button></>)
        : (<><button onClick={()=>login('user')}>Login as User</button><button onClick={()=>login('admin')}>Login as Admin</button></>)
      }
    </div>
  )
}

const LocalQuickAdd: React.FC = () => {
  const { add } = useSongsStore()
  const [title, setTitle] = React.useState(''), [artist, setArtist] = React.useState(''), [album, setAlbum] = React.useState('')
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <b>Quick Add (from Main App)</b><br/>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Artist" value={artist} onChange={e=>setArtist(e.target.value)} />
      <input placeholder="Album" value={album} onChange={e=>setAlbum(e.target.value)} />
      <button onClick={()=>{
        if(!title || !artist || !album) return
        add({ title, artist, album }); setTitle(''); setArtist(''); setAlbum('')
      }}>Add</button>
    </div>
  )
}

const Home: React.FC = () => {
  const { role } = useAuth()
  const { songs, add, remove } = useSongsStore()
  return (
    <div className="container">
      <div className="card" style={{ marginBottom: 12 }}>
        <b>Store debug:</b> songs count = {songs.length}
      </div>
      <LocalQuickAdd />
      <ErrorBoundary>
        <Suspense fallback={<div className="card">Loading Music Library…</div>}>
          <MusicLibrary role={role ?? 'user'} songs={songs} onAdd={add} onDelete={remove} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <SongsProvider>
        <Toolbar />
        <Home />
      </SongsProvider>
    </AuthProvider>
  )
}
