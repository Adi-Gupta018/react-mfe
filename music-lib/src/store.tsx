import React, { createContext, useContext, useReducer } from 'react'
import type { Song } from './types'

type Action =
  | { type: 'ADD'; payload: Song }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'SET'; payload: Song[] }

function reducer(state: Song[], action: Action): Song[] {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'DELETE':
      return state.filter(s => s.id !== action.payload.id)
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const SongsContext = createContext<{ songs: Song[]; dispatch: React.Dispatch<Action> } | null>(null)

export const SongsProvider: React.FC<{ initial: Song[]; children: React.ReactNode }> = ({ initial, children }) => {
  const [songs, dispatch] = useReducer(reducer, initial)
  return <SongsContext.Provider value={{ songs, dispatch }}>{children}</SongsContext.Provider>
}

export const useSongs = () => {
  const ctx = useContext(SongsContext)
  if (!ctx) throw new Error('useSongs must be used within SongsProvider')
  return ctx
}
