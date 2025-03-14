import { easings, useSpring } from '@react-spring/three'
import { useEffect } from 'react'
import { useCubiiStore } from '../../cubii-store'

export function useBackWallAnimation() {
  const { backWallState, setBackWallState, lidState } = useCubiiStore()

  const [{ rotationX }, animation] = useSpring(() => ({
    from: { rotationX: 0 },
  }))

  const open = () => {
    setBackWallState('opening')
    animation.start({
      to: [
        {
          delay: 150,
          rotationX: -Math.PI / 2,
          config: { duration: 500, easing: easings.easeOutBounce },
        },
      ],
      onResolve: () => {
        setBackWallState('open')
      },
    })
  }

  const close = () => {
    setBackWallState('closing')
    animation.start({
      to: [
        {
          rotationX: 0,
          config: { duration: 280, easing: easings.easeInBack },
        },
      ],
      onResolve: () => {
        setBackWallState('closed')
      },
    })
  }

  const toggle = () => {
    if (backWallState === 'opening' || backWallState === 'closing') {
      return
    }
    if (backWallState === 'closed') {
      open()
    } else {
      close()
    }
  }

  useEffect(() => {
    if (lidState === 'opening' || lidState === 'closing') {
      return
    }
    if (lidState === 'open') {
      open()
    } else {
      close()
    }
  }, [lidState])

  return { rotationX, open, close, toggle }
}
