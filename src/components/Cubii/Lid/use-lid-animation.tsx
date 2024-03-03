import { easings, useSpring } from '@react-spring/three'
import { useState } from 'react'

export const useLidAnimation = () => {
  const [{ open, opening }, setState] = useState({
    open: false,
    opening: false,
  })

  const [{ positionY, rotationY }, animation] = useSpring(() => ({
    from: { positionY: 1.5, rotationY: 0 },
  }))

  const openingAnimation = () => {
    animation.start({
      to: [
        {
          positionY: 4.5,
          config: {
            duration: 800,
            easing: easings.easeInOutBack,
          },
        },
        {
          rotationY: (Math.PI / 4) * 5,
          config: {
            duration: 500,
            easing: easings.easeOutCubic,
          },
          onResolve: () => {
            setState({
              open: true,
              opening: false,
            })
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
          config: {
            duration: 500,
            easing: easings.easeInOutCubic,
          },
        },
        {
          positionY: 1.5,
          config: {
            duration: 800,
            easing: easings.easeInOutBack,
          },
          onResolve: () => {
            setState({
              open: false,
              opening: false,
            })
          },
        },
      ],
    })
  }

  const toggleOpen = () => {
    if (open) {
      setState((state) => ({
        ...state,
        opening: true,
      }))
      closingAnimation()
    } else {
      setState({
        open: false,
        opening: true,
      })
      openingAnimation()
    }
  }

  const peek = () => {
    if (open || opening) {
      return
    }
    animation.start({
      to: [
        {
          positionY: 1.6,
          config: {
            duration: 400,
            easing: easings.easeInOutCubic,
          },
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
          config: {
            duration: 280,
            easing: easings.easeOutCubic,
          },
        },
      ],
    })
  }

  return { toggleOpen, peek, hide, positionY, rotationY }
}
