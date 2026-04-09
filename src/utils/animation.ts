import { Player } from '../store/gameStore'

export interface AnimationFrame {
  frame: number
  duration: number
}

export interface Animation {
  frames: AnimationFrame[]
  loop: boolean
}

export const animations = {
  idle: {
    frames: [
      { frame: 0, duration: 10 }
    ],
    loop: true
  },
  moving: {
    frames: [
      { frame: 1, duration: 5 },
      { frame: 2, duration: 5 }
    ],
    loop: true
  },
  attacking: {
    frames: [
      { frame: 3, duration: 3 },
      { frame: 4, duration: 3 },
      { frame: 5, duration: 3 }
    ],
    loop: false
  },
  defending: {
    frames: [
      { frame: 6, duration: 10 }
    ],
    loop: true
  },
  hit: {
    frames: [
      { frame: 7, duration: 5 }
    ],
    loop: false
  }
}

export function updateAnimation(player: Player, deltaTime: number): Player {
  const animation = animations[player.state]
  if (!animation) return player

  let newAnimationFrame = player.animationFrame + deltaTime
  const totalFrames = animation.frames.reduce((sum: number, frame: AnimationFrame) => sum + frame.duration, 0)

  if (newAnimationFrame >= totalFrames) {
    if (animation.loop) {
      newAnimationFrame = 0
    } else {
      newAnimationFrame = totalFrames - 1
      // 动画结束后恢复到 idle 状态
      return {
        ...player,
        animationFrame: newAnimationFrame,
        state: 'idle'
      }
    }
  }

  return {
    ...player,
    animationFrame: newAnimationFrame
  }
}