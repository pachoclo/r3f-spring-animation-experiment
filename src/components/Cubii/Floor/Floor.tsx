import { animated } from '@react-spring/three'
import { useControls } from 'leva'
import { BoxGeometry, MeshNormalMaterial } from 'three'

import { GroupStopEventPropagation } from '../../GroupStopEventPropagation'
import { useFloorAnimation } from './use-floor-animation'

const geometry = new BoxGeometry(2, 2, 0.5)
const material = new MeshNormalMaterial()

export function Floor() {
  const { rotationZ, toggleOpen } = useFloorAnimation()
  const AnimatedFloor = animated(FloorBase)

  return (
    <GroupStopEventPropagation
      onPointerUp={toggleOpen}
      onPointerLeave={() => (document.body.style.cursor = 'default')}
      onPointerEnter={() => (document.body.style.cursor = 'pointer')}
    >
      <AnimatedFloor rotationZ={rotationZ} />
    </GroupStopEventPropagation>
  )
}

function FloorBase({ rotationZ }: { rotationZ: number }) {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  return (
    <group rotation-z={rotationZ} position={[-1, -2, 0]}>
      <mesh
        geometry={geometry}
        material={material}
        rotation-x={-Math.PI / 2}
        position={[1, 0.25, 0]}
      />
    </group>
  )
}
