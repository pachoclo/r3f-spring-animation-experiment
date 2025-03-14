import { easings, useSpring } from '@react-spring/three'
import { useCallback, useEffect } from 'react'

import { useCubiiStore } from '../cubii-store'

export const useLidAnimation = () => {
  const {
    lidState,
    setLidState,
    lidHasBeenOpened,
    setLidHasBeenOpened,
    lidIsPeeking,
    setLidIsPeeking,
  } = useCubiiStore()

  const [{ positionY, rotationY }, animation] = useSpring(() => ({
    from: { positionY: 1.5, rotationY: 0 },
  }))

  const open = () => {
    setLidState('opening')
    animation.start({
      to: [
        {
          positionY: 4.5,
          config: { duration: 500, easing: easings.easeInOutBack },
        },
        {
          rotationY: (Math.PI / 4) * 5,
          config: { duration: 500, easing: easings.easeOutCubic },
          onResolve: () => {
            setLidHasBeenOpened(true)
            setLidState('open')
          },
        },
      ],
    })
  }

  const close = () => {
    setLidState('closing')
    animation.start({
      config: {},
      to: [
        {
          rotationY: 0,
          config: { duration: 500, easing: easings.easeInOutCubic },
        },
        {
          positionY: 1.5,
          config: { duration: 800, easing: easings.easeInOutBack },
        },
      ],
      onResolve: () => {
        setLidState('closed')
      },
    })
  }

  const toggleOpen = () => {
    if (lidIsPeeking) return
    if (lidState === 'open') close()
    if (lidState === 'closed') open()
  }

  const peek = (onRestCallback?: () => void) => {
    if (lidState === 'opening' || lidState === 'closing' || lidState === 'open') return
    animation.start({
      to: [
        {
          positionY: 1.65,
          config: { duration: 400, easing: easings.easeInOutCubic },
          onResolve: () => {
            onRestCallback?.()
          },
        },
      ],
    })
  }

  const hide = () => {
    if (lidState === 'opening' || lidState === 'closing' || lidState === 'open') return
    animation.start({
      to: [
        {
          positionY: 1.5,
          config: { duration: 280, easing: easings.easeOutCubic },
          onResolve: () => {},
        },
      ],
    })
  }

  const peekABoo = () => {
    if (lidHasBeenOpened) {
      return
    }
    peek(() => {
      setTimeout(() => {
        hide()
      }, 300)
    })
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      peekABoo()
    }, 1500)

    return () => clearTimeout(timeout)
  }, [peekABoo])

  return { toggleOpen, peek, hide, positionY, rotationY }
}
