import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GameCanvas from '../Game/GameCanvas'
import GameUI from '../Game/GameUI'
import useGameLoop from '../../hooks/useGameLoop'
import useInput from '../../hooks/useInput'
import useGameStore from '../../store/gameStore'

const GamePage: React.FC = () => {
  const navigate = useNavigate()
  const { gamePhase } = useGameStore()

  // 使用游戏循环和输入处理钩子
  useGameLoop()
  useInput()

  // 监听游戏状态变化，当游戏结束时跳转到游戏结束页面
  useEffect(() => {
    if (gamePhase === 'gameOver') {
      navigate('/game-over')
    }
  }, [gamePhase, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary p-4">
      <h1 className="text-2xl font-pixel text-secondary mb-4">机甲对战</h1>
      <GameUI />
      <div className="mt-4">
        <GameCanvas />
      </div>
    </div>
  )
}

export default GamePage