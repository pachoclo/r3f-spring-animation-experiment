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

  const openingAnimation = (onOpen: () => void) => {
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
            onOpen()
            setState({ open: true, opening: false, hasBeenOpened: true })
          },
        },
      ],
    })
  }

  const closingAnimation = (onClose: () => void) => {
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
            onClose()
          },
        },
      ],
    })
  }

  const toggleOpen = (onOpen: () => void) => {
    if (open) {
      setState((prev) => ({ ...prev, opening: true }))
      closingAnimation(onOpen)
    } else {
      setState((prev) => ({ ...prev, open: false, opening: true }))
      openingAnimation(onOpen)
    }
  }

  const peek = (onRestCallback?: () => void) => {
    if (open || opening) {
      return
    }
    animation.start({
      to: [
        {
          positionY: 1.65,
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
