import { create } from 'zustand'

export interface Player {
  id: number
  position: { x: number; y: number }
  health: number
  maxHealth: number
  state: 'idle' | 'moving' | 'attacking' | 'defending' | 'hit'
  direction: 'left' | 'right'
  animationFrame: number
  cooldowns: {
    attack: number
    defend: number
  }
}

interface GameState {
  players: Player[]
  gamePhase: 'menu' | 'playing' | 'gameOver'
  winner: number | null
  startGame: () => void
  resetGame: () => void
  updatePlayer: (id: number, updates: Partial<Player>) => void
  setGameOver: (winner: number) => void
  updateCooldowns: () => void
}

const useGameStore = create<GameState>((set) => ({
  players: [
    {
      id: 1,
      position: { x: 100, y: 200 },
      health: 100,
      maxHealth: 100,
      state: 'idle',
      direction: 'right',
      animationFrame: 0,
      cooldowns: {
        attack: 0,
        defend: 0
      }
    },
    {
      id: 2,
      position: { x: 700, y: 200 },
      health: 100,
      maxHealth: 100,
      state: 'idle',
      direction: 'left',
      animationFrame: 0,
      cooldowns: {
        attack: 0,
        defend: 0
      }
    }
  ],
  gamePhase: 'menu',
  winner: null,
  startGame: () => set({ gamePhase: 'playing', winner: null }),
  resetGame: () => set({
    players: [
      {
        id: 1,
        position: { x: 100, y: 200 },
        health: 100,
        maxHealth: 100,
        state: 'idle',
        direction: 'right',
        animationFrame: 0,
        cooldowns: {
          attack: 0,
          defend: 0
        }
      },
      {
        id: 2,
        position: { x: 700, y: 200 },
        health: 100,
        maxHealth: 100,
        state: 'idle',
        direction: 'left',
        animationFrame: 0,
        cooldowns: {
          attack: 0,
          defend: 0
        }
      }
    ],
    gamePhase: 'playing',
    winner: null
  }),
  updatePlayer: (id, updates) => set((state) => ({
    players: state.players.map((player) =>
      player.id === id ? { ...player, ...updates } : player
    )
  })),
  setGameOver: (winner) => set({ gamePhase: 'gameOver', winner }),
  updateCooldowns: () => set((state) => ({
    players: state.players.map((player) => ({
      ...player,
      cooldowns: {
        attack: Math.max(0, player.cooldowns.attack - 1),
        defend: Math.max(0, player.cooldowns.defend - 1)
      }
    }))
  }))
}))

export default useGameStore