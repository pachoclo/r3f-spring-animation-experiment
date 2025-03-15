import { easings, useSpring } from '@react-spring/three'
import { useEffect } from 'react'
import { useCubiiStore } from '../cubii-store'

const INITIAL_POSITION = [2, -2, 0]

export function useLeftWallAnimation() {
  const { leftWallState, setLeftWallState, lidState } = useCubiiStore()

  const [{ rotationZ, position }, animation] = useSpring(() => ({
    from: { rotationZ: 0, position: INITIAL_POSITION },
  }))

  const open = () => {
    setLeftWallState('opening')
    animation.start({
      to: [
        {
          position: [2, -3, 0],
          config: { duration: 280, easing: easings.easeInBack },
        },
        {
          rotationZ: -Math.PI / 2,
          config: { duration: 500, easing: easings.easeOutBounce },
        },
      ],
      onResolve: () => {
        setLeftWallState('open')
      },
    })
  }

  const close = () => {
    setLeftWallState('closing')
    animation.start({
      to: [
        {
          rotationZ: 0,
          config: { duration: 280, easing: easings.easeInBack },
        },
        {
          position: INITIAL_POSITION,
          config: { duration: 280, easing: easings.easeInBack },
        },
      ],
      onResolve: () => {
        setLeftWallState('closed')
      },
    })
  }

  const toggle = () => {
    if (leftWallState === 'closed') open()
    if (leftWallState === 'open') close()
  }

  useEffect(() => {
    if (lidState === 'open') open()
    if (lidState === 'closed') close()
  }, [lidState])

  return { rotationZ, position, open, close, toggle }
}
