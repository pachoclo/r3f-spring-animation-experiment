import { Floor } from './Floor/Floor'
import { Lid } from './Lid/Lid'
import { Walls } from './Walls/Walls'

function Cubii() {
  return (
    <group>
      <Lid />
      <Walls />
      <Floor />
    </group>
  )
}

export { Cubii }
