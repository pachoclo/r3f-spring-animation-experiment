import { useState } from 'react'

import { Floor } from './Floor/Floor'
import { Lid } from './Lid/Lid'
import { Walls } from './Walls/Walls'

function Cubii() {
  const [open, setOpen] = useState(false)

  return (
    <group>
      <Lid onOpen={() => setOpen(!open)} />
      <Walls open={open} />
      <Floor />
    </group>
  )
}

export { Cubii }
