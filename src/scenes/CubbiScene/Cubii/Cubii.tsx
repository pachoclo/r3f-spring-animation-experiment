import { BackWall } from './BackWall/BackWall'
import { Floor } from './Floor/Floor'
import { FrontWall } from './FrontWall/FrontWall'
import { LeftWall } from './LeftWall/LeftWall'
import { Lid } from './Lid/Lid'
import { RightWall } from './RightWall/RightWall'

function Cubii() {
  return (
    <group>
      <Lid />
      <FrontWall />
      <BackWall />
      <RightWall />
      <LeftWall />
      <Floor />
    </group>
  )
}

export { Cubii }
