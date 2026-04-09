import { useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore'
import { updateAnimation } from '../utils/animation'
import { checkCollision, getAttackHitbox, getPlayerHitbox } from '../utils/collision'

const useGameLoop = () => {
  const lastTimeRef = useRef<number>(0)
  const animationIdRef = useRef<number>()
  const { players, gamePhase, updatePlayer, setGameOver, updateCooldowns } = useGameStore()

  const gameLoop = (currentTime: number) => {
    const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 16 : 1
    lastTimeRef.current = currentTime

    if (gamePhase === 'playing') {
      // 更新冷却时间
      updateCooldowns()

      // 更新动画
      players.forEach((player) => {
        const updatedPlayer = updateAnimation(player, deltaTime)
        if (updatedPlayer !== player) {
          updatePlayer(player.id, updatedPlayer)
        }
      })

      // 检查攻击碰撞
      const player1 = players[0]
      const player2 = players[1]

      if (player1.state === 'attacking') {
        const attackHitbox = getAttackHitbox(player1)
        const player2Hitbox = getPlayerHitbox(player2)

        if (checkCollision(attackHitbox, player2Hitbox) && player2.state !== 'defending') {
          // 玩家2受到伤害
          const newHealth = Math.max(0, player2.health - 10)
          updatePlayer(2, { health: newHealth, state: 'hit', animationFrame: 0 })

          if (newHealth <= 0) {
            setGameOver(1)
          }
        }
      }

      if (player2.state === 'attacking') {
        const attackHitbox = getAttackHitbox(player2)
        const player1Hitbox = getPlayerHitbox(player1)

        if (checkCollision(attackHitbox, player1Hitbox) && player1.state !== 'defending') {
          // 玩家1受到伤害
          const newHealth = Math.max(0, player1.health - 10)
          updatePlayer(1, { health: newHealth, state: 'hit', animationFrame: 0 })

          if (newHealth <= 0) {
            setGameOver(2)
          }
        }
      }
    }

    animationIdRef.current = requestAnimationFrame(gameLoop)
  }

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [gamePhase, players])
}

export default useGameLoop