import { easings, useSpring } from '@react-spring/three'
import { useState } from 'react'

export const useLidAnimation = () => {
  const [open, setOpen] = useState(false)

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
        },
      ],
    })
  }

  const closingAnimation = () => {
    animation.start({
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
        },
      ],
    })
  }

  const toggleOpen = () => {
    if (open) {
      closingAnimation()
      setOpen(false)
    } else {
      openingAnimation()
      setOpen(true)
    }
  }

  return { toggleOpen, positionY, rotationY }
}
