import { easings, useSpring } from '@react-spring/three'
import { useEffect } from 'react'
import { useCubiiStore } from '../cubii-store'

export function useFrontWallAnimation() {
  const { frontWallState, setFrontWallState, lidState } = useCubiiStore()

  const [{ rotationX }, animation] = useSpring(() => ({
    from: { rotationX: 0 },
  }))

  const open = () => {
    setFrontWallState('opening')
    animation.start({
      to: [
        {
          rotationX: Math.PI / 2,
          config: { duration: 500, easing: easings.easeOutBounce },
        },
      ],
      onResolve: () => {
        setFrontWallState('open')
      },
    })
  }

  const close = () => {
    setFrontWallState('closing')
    animation.start({
      to: [
        {
          rotationX: 0,
          config: { duration: 280, easing: easings.easeInBack },
        },
      ],
      onResolve: () => {
        setFrontWallState('closed')
      },
    })
  }

  const toggle = () => {
    if (frontWallState === 'closed') open()
    if (frontWallState === 'open') close()
  }

  useEffect(() => {
    if (lidState === 'open') open()
    if (lidState === 'closed') close()
  }, [lidState])

  return { rotationX, open, close, toggle }
}
