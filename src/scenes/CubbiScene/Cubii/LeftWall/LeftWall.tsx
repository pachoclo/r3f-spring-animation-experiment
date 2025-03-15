import { GroupStopEventPropagation } from '@/components/GroupStopEventPropagation'
import { animated } from '@react-spring/three'
import { material, sideWallsGeometry } from '../walls-mesh-props'
import { useLeftWallAnimation } from './use-left-wall-animation'

export function LeftWall() {
  const { rotationZ, position, toggle } = useLeftWallAnimation()

  return (
    <AnimatedLeftWall
      rotationZ={rotationZ}
      position={position as unknown as [number, number, number]}
      onClick={toggle}
    />
  )
}

const AnimatedLeftWall = animated(LeftWallBase)

type LeftWallProps = {
  rotationZ: number
  position: [number, number, number]
  onClick: () => void
}

function LeftWallBase({ rotationZ, position, onClick }: LeftWallProps) {
  return (
    <GroupStopEventPropagation position={position} rotation-z={rotationZ} onClick={onClick}>
      <mesh
        name='left-wall'
        geometry={sideWallsGeometry}
        material={material}
        rotation-y={Math.PI / 2}
        position={[-0.5, 2, 0]}
      />
    </GroupStopEventPropagation>
  )
}
