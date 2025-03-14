import { useControls } from 'leva'

import { GroupStopEventPropagation } from '../../GroupStopEventPropagation'
import { BackWall } from './BackWall/BackWall'
import { FrontWall } from './FrontWall/FrontWall'
import { material, sideWallsGeometry } from './walls-mesh-props'

export function Walls() {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  return (
    <GroupStopEventPropagation>
      <FrontWall />
      <BackWall />
      <mesh
        name='right-wall'
        geometry={sideWallsGeometry}
        material={material}
        rotation-y={Math.PI / 2}
        position={[-1.5, 0, 0]}
      />
      <mesh
        name='left-wall'
        geometry={sideWallsGeometry}
        material={material}
        rotation-y={-Math.PI / 2}
        position={[1.5, 0, 0]}
      />
    </GroupStopEventPropagation>
  )
}
