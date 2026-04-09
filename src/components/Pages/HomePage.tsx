import React from 'react'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../../store/gameStore'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { startGame } = useGameStore()

  const handleStartGame = () => {
    startGame()
    navigate('/game')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-pixel text-secondary mb-16">像素风机甲对战</h1>
      <div className="flex flex-col gap-8">
        <button 
          className="pixel-button" 
          onClick={handleStartGame}
        >
          开始游戏
        </button>
        <div className="text-center font-pixel text-sm text-gray">
          <p className="mb-2">操作说明：</p>
          <p className="mb-1">玩家1：WASD移动，J攻击，K防御</p>
          <p>玩家2：方向键移动，1攻击，2防御</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage