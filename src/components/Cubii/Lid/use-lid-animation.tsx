import { easings, useSpring } from '@react-spring/three'
import { useCallback, useEffect, useState } from 'react'

export const useLidAnimation = () => {
  const [{ open, opening, hasBeenOpened }, setState] = useState({
    open: false,
    opening: false,
    hasBeenOpened: false,
  })

  const [{ positionY, rotationY }, animation] = useSpring(() => ({
    from: { positionY: 1.5, rotationY: 0 },
  }))

  const openingAnimation = () => {
    setState((prev) => ({ ...prev, opening: true }))
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
            setState({ open: true, opening: false, hasBeenOpened: true })
          },
        },
      ],
    })
  }

  const closingAnimation = () => {
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
          onResolve: () => {
            setState((prev) => ({ ...prev, open: false, opening: false }))
          },
        },
      ],
    })
  }

  const toggleOpen = () => {
    if (open) {
      setState((prev) => ({ ...prev, opening: true }))
      closingAnimation()
    } else {
      setState((prev) => ({ ...prev, open: false, opening: true }))
      openingAnimation()
    }
  }

  const peek = (onRestCallback?: () => void) => {
    if (open || opening) {
      return
    }
    animation.start({
      to: [
        {
          positionY: 1.6,
          config: { duration: 400, easing: easings.easeInOutCubic },
          onRest: onRestCallback,
        },
      ],
    })
  }

  const hide = () => {
    if (open || opening) {
      return
    }
    animation.start({
      to: [
        {
          positionY: 1.5,
          config: { duration: 280, easing: easings.easeOutCubic },
        },
      ],
    })
  }

  const peekABoo = useCallback(() => {
    if (open || opening || hasBeenOpened) {
      return
    }
    peek(() => {
      setTimeout(() => {
        hide()
      }, 300)
    })
  }, [open, opening, hasBeenOpened])

  useEffect(() => {
    let timeout = setTimeout(() => {
      peekABoo()
    }, 1500)

    return () => clearTimeout(timeout)
  }, [peekABoo])

  return { toggleOpen, peek, peekABoo, hide, positionY, rotationY }
}
