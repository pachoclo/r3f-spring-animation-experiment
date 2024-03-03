import { animated } from '@react-spring/three'
import { Center, CenterProps } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { BoxGeometry, MeshNormalMaterial } from 'three'

import { GroupStopEventPropagation } from '../../GroupStopEventPropagation'
import { useLidAnimation } from './use-lid-animation'

const material = new MeshNormalMaterial()
const geometry = new BoxGeometry(1, 1, 1)

const AnimatedLid = animated(LidBase)

export function Lid() {
  const { positionY, rotationY, toggleOpen, peek, hide } = useLidAnimation()

  return (
    <GroupStopEventPropagation
      onPointerUp={toggleOpen}
      onPointerLeave={() => {
        document.body.style.cursor = 'default'
        hide()
      }}
      onPointerEnter={() => {
        document.body.style.cursor = 'pointer'
        peek()
      }}
    >
      <AnimatedLid positionY={positionY} rotationY={rotationY} />
    </GroupStopEventPropagation>
  )
}

export type LidBaseProps = {
  positionY: number
  rotationY: number
} & CenterProps &
  GroupProps

export function LidBase({ positionY, rotationY }: LidBaseProps) {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  // The Lid is made up of individual 1x1x1 Cubes
  // to have more control over the animation
  const lidBlocks = useMemo(() => {
    const blocks = []
    const sideSize = 2

    for (let x = 0; x < sideSize; x++) {
      for (let z = 0; z < sideSize; z++) {
        blocks.push(
          <mesh
            geometry={geometry}
            material={material}
            position={[x, 0, z]}
            key={`${x}-${0}-${z}`}
          ></mesh>,
        )
      }
    }

    return blocks
  }, [])

  return (
    <Center position-y={positionY} rotation-y={rotationY}>
      {lidBlocks.map((lidBlock) => lidBlock)}
    </Center>
  )
}
