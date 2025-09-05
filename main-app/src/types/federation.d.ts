// declare module 'music_lib/MusicLibrary' {
//   import { ComponentType } from 'react'
//   const Component: ComponentType<{ role?: 'admin' | 'user' }>
//   export default Component
// }

declare module 'music_lib/MusicLibrary' {
  import { ComponentType } from 'react'
  export type Song = { id: string; title: string; artist: string; album: string }
  const Component: ComponentType<{
    role?: 'admin' | 'user'
    songs?: Song[]
    onAdd?: (d: Omit<Song,'id'>) => void
    onDelete?: (id: string) => void
  }>
  export default Component
}
