import { useEffect } from 'react'
import useGameStore from '../store/gameStore'

const useInput = () => {
  const { players, updatePlayer } = useGameStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const player1 = players[0]
      const player2 = players[1]

      // 玩家1控制
      switch (event.key) {
        case 'w':
          // 上移
          updatePlayer(1, {
            position: { ...player1.position, y: Math.max(50, player1.position.y - 5) },
            state: 'moving'
          })
          break
        case 's':
          // 下移
          updatePlayer(1, {
            position: { ...player1.position, y: Math.min(300, player1.position.y + 5) },
            state: 'moving'
          })
          break
        case 'a':
          // 左移
          updatePlayer(1, {
            position: { ...player1.position, x: Math.max(0, player1.position.x - 5) },
            state: 'moving',
            direction: 'left'
          })
          break
        case 'd':
          // 右移
          updatePlayer(1, {
            position: { ...player1.position, x: Math.min(400, player1.position.x + 5) },
            state: 'moving',
            direction: 'right'
          })
          break
        case 'j':
          // 攻击
          if (player1.cooldowns.attack === 0) {
            updatePlayer(1, {
              state: 'attacking',
              animationFrame: 0,
              cooldowns: { ...player1.cooldowns, attack: 20 }
            })
          }
          break
        case 'k':
          // 防御
          if (player1.cooldowns.defend === 0) {
            updatePlayer(1, {
              state: 'defending',
              cooldowns: { ...player1.cooldowns, defend: 15 }
            })
          }
          break
      }

      // 玩家2控制
      switch (event.key) {
        case 'ArrowUp':
          // 上移
          updatePlayer(2, {
            position: { ...player2.position, y: Math.max(50, player2.position.y - 5) },
            state: 'moving'
          })
          break
        case 'ArrowDown':
          // 下移
          updatePlayer(2, {
            position: { ...player2.position, y: Math.min(300, player2.position.y + 5) },
            state: 'moving'
          })
          break
        case 'ArrowLeft':
          // 左移
          updatePlayer(2, {
            position: { ...player2.position, x: Math.max(450, player2.position.x - 5) },
            state: 'moving',
            direction: 'left'
          })
          break
        case 'ArrowRight':
          // 右移
          updatePlayer(2, {
            position: { ...player2.position, x: Math.min(800, player2.position.x + 5) },
            state: 'moving',
            direction: 'right'
          })
          break
        case '1':
          // 攻击
          if (player2.cooldowns.attack === 0) {
            updatePlayer(2, {
              state: 'attacking',
              animationFrame: 0,
              cooldowns: { ...player2.cooldowns, attack: 20 }
            })
          }
          break
        case '2':
          // 防御
          if (player2.cooldowns.defend === 0) {
            updatePlayer(2, {
              state: 'defending',
              cooldowns: { ...player2.cooldowns, defend: 15 }
            })
          }
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      // 玩家1松开按键后恢复 idle 状态
      if (['w', 's', 'a', 'd'].includes(event.key)) {
        const player1 = players[0]
        if (player1.state === 'moving') {
          updatePlayer(1, { state: 'idle' })
        }
      }

      // 玩家2松开按键后恢复 idle 状态
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        const player2 = players[1]
        if (player2.state === 'moving') {
          updatePlayer(2, { state: 'idle' })
        }
      }

      // 玩家1松开防御键后恢复 idle 状态
      if (event.key === 'k') {
        const player1 = players[0]
        if (player1.state === 'defending') {
          updatePlayer(1, { state: 'idle' })
        }
      }

      // 玩家2松开防御键后恢复 idle 状态
      if (event.key === '2') {
        const player2 = players[1]
        if (player2.state === 'defending') {
          updatePlayer(2, { state: 'idle' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [players, updatePlayer])
}

export default useInput