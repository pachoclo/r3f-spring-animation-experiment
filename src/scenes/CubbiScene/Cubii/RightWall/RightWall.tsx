import { GroupStopEventPropagation } from '@/components/GroupStopEventPropagation'
import { animated } from '@react-spring/three'
import { material, sideWallsGeometry } from '../walls-mesh-props'
import { useRightWallAnimation } from './use-right-wall-animation'

export function RightWall() {
  const { rotationZ, position, toggle } = useRightWallAnimation()

  return (
    <AnimatedRightWall
      rotationZ={rotationZ}
      position={position as unknown as [number, number, number]}
      onClick={toggle}
    />
  )
}

const AnimatedRightWall = animated(RightWallBase)

type RightWallProps = {
  rotationZ: number
  position: [number, number, number]
  onClick: () => void
}

function RightWallBase({ rotationZ, position, onClick }: RightWallProps) {
  return (
    <GroupStopEventPropagation position={position} rotation-z={rotationZ} onClick={onClick}>
      <mesh
        name='right-wall'
        geometry={sideWallsGeometry}
        material={material}
        rotation-y={Math.PI / 2}
        position={[0.5, 2, 0]}
      />
    </GroupStopEventPropagation>
  )
}
