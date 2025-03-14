import { easings, useSpring } from '@react-spring/three'
import { useState } from 'react'

type Props = { rotationDirection: 'positive' | 'negative' }

export function useWallsAnimation({ rotationDirection = 'positive' }: Props) {
  const [erected, setErected] = useState(true)

  const [{ rotationX }, animation] = useSpring(() => ({
    from: { rotationX: 0 },
  }))

  const fallOver = () => {
    animation.start({
      to: [
        {
          rotationX:
            rotationDirection === 'positive' ? Math.PI / 2 : -(Math.PI / 2),
          config: { duration: 500, easing: easings.easeOutBounce },
        },
      ],
      onResolve: () => setErected(false),
    })
  }

  const erect = () => {
    animation.start({
      to: [
        {
          rotationX: 0,
          config: { duration: 500, easing: easings.easeOutQuint },
        },
      ],
      onResolve: () => setErected(true),
    })
  }

  const toggle = () => {
    if (erected) {
      fallOver()
    } else {
      erect()
    }
  }

  return { rotationX, fallOver, erect, erected, toggle }
}
