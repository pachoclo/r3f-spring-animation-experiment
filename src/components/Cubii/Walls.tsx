import { useControls } from 'leva'
import { BoxGeometry, MeshNormalMaterial } from 'three'

import { GroupStopEventPropagation } from '../GroupStopEventPropagation'

const frontBackWallsGeometry = new BoxGeometry(4, 4, 1)
const sideWallsGeometry = new BoxGeometry(2, 4, 1)
const material = new MeshNormalMaterial()

export function Walls() {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  return (
    <GroupStopEventPropagation>
      <mesh
        name='front-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 0, 1.5]}
      />
      <mesh
        name='back-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 0, -1.5]}
      />
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
