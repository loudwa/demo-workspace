export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export function checkCollision(rect1: Rect, rect2: Rect): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export function getAttackHitbox(player: { position: { x: number; y: number }; direction: 'left' | 'right' }): Rect {
  const width = 40
  const height = 20
  
  return {
    x: player.direction === 'right' ? player.position.x + 32 : player.position.x - width,
    y: player.position.y + 8,
    width,
    height
  }
}

export function getPlayerHitbox(player: { position: { x: number; y: number } }): Rect {
  return {
    x: player.position.x,
    y: player.position.y,
    width: 32,
    height: 32
  }
}