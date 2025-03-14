import { animated } from '@react-spring/three'

import { GroupStopEventPropagation } from '../../../GroupStopEventPropagation'
import { frontBackWallsGeometry, material } from '../walls-mesh-props'
import { useBackWallAnimation } from './use-backwall-animation'

export function BackWall() {
  const { rotationX, toggle } = useBackWallAnimation()

  return <AnimatedBackWall rotationX={rotationX} onClick={toggle} />
}

const AnimatedBackWall = animated(BackWallBase)

function BackWallBase({ rotationX, onClick }: { rotationX: number; onClick: () => void }) {
  return (
    <GroupStopEventPropagation position={[0, -2, -1]} rotation-x={rotationX} onClick={onClick}>
      <mesh
        name='back-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 2, -0.5]}
      />
    </GroupStopEventPropagation>
  )
}
