import { GroupStopEventPropagation } from '@/components/GroupStopEventPropagation'
import { animated } from '@react-spring/three'
import { frontBackWallsGeometry, material } from '../walls-mesh-props'
import { useFrontWallAnimation } from './use-frontwall-animation'

const AnimatedFrontWall = animated(FrontWallBase)

export function FrontWall() {
  const { rotationX, toggle } = useFrontWallAnimation()

  return <AnimatedFrontWall rotationX={rotationX} onClick={toggle} />
}

function FrontWallBase({ rotationX, onClick }: { rotationX: number; onClick: () => void }) {
  return (
    <GroupStopEventPropagation position={[0, -2, 1]} rotation-x={rotationX} onClick={onClick}>
      <mesh
        name='front-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 2, 0.5]}
      />
    </GroupStopEventPropagation>
  )
}
