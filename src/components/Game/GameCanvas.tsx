import React, { useEffect, useRef } from 'react'
import useGameStore from '../../store/gameStore'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { players } = useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 绘制背景
    ctx.fillStyle = '#2a2a3e'
    ctx.fillRect(0, 0, canvas.width, canvas.height - 50)

    // 绘制地面
    ctx.fillStyle = '#333333'
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50)

    // 绘制建筑
    ctx.fillStyle = '#444444'
    ctx.fillRect(50, canvas.height - 150, 40, 100)
    ctx.fillRect(150, canvas.height - 200, 60, 150)
    ctx.fillRect(250, canvas.height - 180, 50, 130)
    ctx.fillRect(550, canvas.height - 160, 40, 110)
    ctx.fillRect(650, canvas.height - 190, 60, 140)
    ctx.fillRect(750, canvas.height - 170, 50, 120)

    // 绘制玩家1
    const player1 = players[0]
    ctx.save()
    if (player1.direction === 'left') {
      ctx.scale(-1, 1)
      ctx.translate(-player1.position.x - 32, 0)
    }
    
    // 绘制机甲主体
    ctx.fillStyle = '#ff7700'
    ctx.fillRect(player1.position.x, player1.position.y, 32, 32)
    
    // 绘制机甲头部
    ctx.fillStyle = '#ff9933'
    ctx.fillRect(player1.position.x + 8, player1.position.y - 8, 16, 8)
    
    // 绘制机甲手臂
    if (player1.state === 'attacking') {
      ctx.fillStyle = '#ff9933'
      ctx.fillRect(player1.position.x + 32, player1.position.y + 8, 16, 8)
    } else if (player1.state === 'defending') {
      ctx.fillStyle = '#ff9933'
      ctx.fillRect(player1.position.x, player1.position.y + 8, 16, 8)
    } else {
      ctx.fillStyle = '#ff9933'
      ctx.fillRect(player1.position.x - 8, player1.position.y + 8, 8, 8)
      ctx.fillRect(player1.position.x + 32, player1.position.y + 8, 8, 8)
    }
    
    ctx.restore()

    // 绘制玩家2
    const player2 = players[1]
    ctx.save()
    if (player2.direction === 'left') {
      ctx.scale(-1, 1)
      ctx.translate(-player2.position.x - 32, 0)
    }
    
    // 绘制机甲主体
    ctx.fillStyle = '#0099ff'
    ctx.fillRect(player2.position.x, player2.position.y, 32, 32)
    
    // 绘制机甲头部
    ctx.fillStyle = '#33ccff'
    ctx.fillRect(player2.position.x + 8, player2.position.y - 8, 16, 8)
    
    // 绘制机甲手臂
    if (player2.state === 'attacking') {
      ctx.fillStyle = '#33ccff'
      ctx.fillRect(player2.position.x + 32, player2.position.y + 8, 16, 8)
    } else if (player2.state === 'defending') {
      ctx.fillStyle = '#33ccff'
      ctx.fillRect(player2.position.x, player2.position.y + 8, 16, 8)
    } else {
      ctx.fillStyle = '#33ccff'
      ctx.fillRect(player2.position.x - 8, player2.position.y + 8, 8, 8)
      ctx.fillRect(player2.position.x + 32, player2.position.y + 8, 8, 8)
    }
    
    ctx.restore()

  }, [players])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="border border-gray"
    />
  )
}

export default GameCanvas