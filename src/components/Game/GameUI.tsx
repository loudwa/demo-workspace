import React from 'react'
import useGameStore from '../../store/gameStore'

const GameUI: React.FC = () => {
  const { players } = useGameStore()
  const player1 = players[0]
  const player2 = players[1]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 生命值显示 */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <div className="font-pixel text-sm mb-1">玩家1</div>
          <div className="w-64 h-4 bg-gray rounded-sm overflow-hidden">
            <div 
              className="h-full bg-green" 
              style={{ width: `${(player1.health / player1.maxHealth) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-pixel text-sm mb-1">玩家2</div>
          <div className="w-64 h-4 bg-gray rounded-sm overflow-hidden">
            <div 
              className="h-full bg-green" 
              style={{ width: `${(player2.health / player2.maxHealth) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 操作提示 */}
      <div className="mt-4 font-pixel text-xs text-gray text-center">
        <p>玩家1：WASD移动，J攻击，K防御 | 玩家2：方向键移动，1攻击，2防御</p>
      </div>
    </div>
  )
}

export default GameUI