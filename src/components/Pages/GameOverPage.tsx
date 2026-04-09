import React from 'react'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../../store/gameStore'

const GameOverPage: React.FC = () => {
  const navigate = useNavigate()
  const { winner, resetGame } = useGameStore()

  const handleRestartGame = () => {
    resetGame()
    navigate('/game')
  }

  const handleBackToMenu = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <h1 className="text-4xl font-pixel text-secondary mb-16">游戏结束</h1>
      <div className="font-pixel text-2xl mb-16">
        {winner ? `玩家${winner} 胜利！` : '平局'}
      </div>
      <div className="flex flex-col gap-4">
        <button 
          className="pixel-button" 
          onClick={handleRestartGame}
        >
          重新开始
        </button>
        <button 
          className="pixel-button" 
          onClick={handleBackToMenu}
        >
          返回主菜单
        </button>
      </div>
    </div>
  )
}

export default GameOverPage