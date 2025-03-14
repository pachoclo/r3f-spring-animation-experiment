import { animated } from '@react-spring/three'
import { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { BoxGeometry, MeshNormalMaterial } from 'three'
import { GroupStopEventPropagation } from '../../GroupStopEventPropagation'
import { useLidAnimation } from './use-lid-animation'

const material = new MeshNormalMaterial()
const geometry = new BoxGeometry(2, 1, 2)

const AnimatedLid = animated(LidBase)

export function Lid() {
  const { positionY, rotationY, toggleOpen, peek, hide } = useLidAnimation()

  return (
    <AnimatedLid
      positionY={positionY}
      rotationY={rotationY}
      onPointerUp={toggleOpen}
      onPointerEnter={() => {
        document.body.style.cursor = 'pointer'
        peek()
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'default'
        hide()
      }}
    />
  )
}

export type LidBaseProps = {
  positionY: number
  rotationY: number
} & GroupProps

export function LidBase({
  positionY,
  rotationY,
  onPointerUp,
  onPointerLeave,
  onPointerEnter,
}: LidBaseProps) {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  return (
    <GroupStopEventPropagation position-y={positionY} rotation-y={rotationY}>
      <mesh
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        geometry={geometry}
        material={material}
        position={[0, 0, 0]}
        rotation-y={Math.PI / 2}
      ></mesh>
    </GroupStopEventPropagation>
  )
}
