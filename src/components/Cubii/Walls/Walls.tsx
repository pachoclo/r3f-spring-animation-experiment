import { animated } from '@react-spring/three'
import { useControls } from 'leva'
import { useEffect } from 'react'
import { BoxGeometry, MeshNormalMaterial } from 'three'

import { GroupStopEventPropagation } from '../../GroupStopEventPropagation'
import { useWallsAnimation } from './use-walls-animation'

const frontBackWallsGeometry = new BoxGeometry(4, 4, 1)
const sideWallsGeometry = new BoxGeometry(2, 4, 1)
const material = new MeshNormalMaterial()

const AnimatedFrontWall = animated(FrontWall)
const AnimatedBackWall = animated(BackWall)

export function Walls({ open = false }: { open: boolean }) {
  const { wireframe } = useControls('Helpers', { wireframe: false })
  material.wireframe = wireframe

  // front wall animation
  const {
    rotationX: frontWallRotationX,
    toggle: frontWallToggle,
    fallOver: frontWallFallOver,
    erect: frontWallErect,
  } = useWallsAnimation({ rotationDirection: 'positive' })

  // back wall animation
  const {
    rotationX: backWallRotationX,
    toggle: backWallToggle,
    fallOver: backWallFallOver,
    erect: backWallErect,
  } = useWallsAnimation({ rotationDirection: 'negative' })

  useEffect(() => {
    if (open) {
      frontWallFallOver()
      backWallFallOver()
    } else {
      frontWallErect()
      backWallErect()
    }
  }, [open])

  return (
    <GroupStopEventPropagation>
      <AnimatedFrontWall
        rotationX={frontWallRotationX}
        onClick={frontWallToggle}
      />
      <AnimatedBackWall
        rotationX={backWallRotationX}
        onClick={backWallToggle}
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

function FrontWall({
  rotationX,
  onClick,
}: {
  rotationX: number
  onClick: () => void
}) {
  return (
    <GroupStopEventPropagation rotation-x={rotationX} position={[0, -2, 1]}>
      <mesh
        name='front-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 2, 0.5]}
        onClick={onClick}
      />
    </GroupStopEventPropagation>
  )
}

function BackWall({
  rotationX,
  onClick,
}: {
  rotationX: number
  onClick: () => void
}) {
  return (
    <GroupStopEventPropagation rotation-x={rotationX} position={[0, -2, -1]}>
      <mesh
        name='back-wall'
        geometry={frontBackWallsGeometry}
        material={material}
        position={[0, 2, -0.5]}
        onClick={onClick}
      />
    </GroupStopEventPropagation>
  )
}
