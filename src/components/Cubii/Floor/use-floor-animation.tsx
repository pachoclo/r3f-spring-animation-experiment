import { easings, useSpring } from '@react-spring/three'
import { useState } from 'react'

export const useFloorAnimation = () => {
  const [open, setOpen] = useState(false)

  const [{ rotationZ }, animation] = useSpring(() => ({
    from: { rotationZ: 0 },
  }))

  const openingAnimation = () => {
    animation.start({
      to: [
        {
          rotationZ: -(Math.PI / 2),
          config: {
            duration: 400,
            easing: easings.easeInOutBack,
          },
        },
      ],
    })
  }

  const closingAnimation = () => {
    animation.start({
      to: [
        {
          rotationZ: 0,
          config: {
            duration: 400,
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

  return { toggleOpen, rotationZ }
}
