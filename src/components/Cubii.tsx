import { animated, easings, useSpring } from '@react-spring/three'
import { Center } from '@react-three/drei'
import { useMemo, useState } from 'react'
import { BoxGeometry, MeshNormalMaterial } from 'three'

// =======================
//  Cubii Part Components
// =======================

const geometry = new BoxGeometry(1, 1, 1)

const frontBackWallsGeometry = new BoxGeometry(4, 4, 1)
const sideWallsGeometry = new BoxGeometry(2, 4, 1)
const floorGeometry = new BoxGeometry(2, 2, 1)

const material = new MeshNormalMaterial()

function Walls() {
  return (
    <group>
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
    </group>
  )
}

function Floor() {
  return (
    <mesh
      geometry={floorGeometry}
      material={material}
      rotation-x={-Math.PI / 2}
      position={[0, -1.5, 0]}
    />
  )
}

type LidProps = {
  positionY: number
  rotationY: number
}

function Lid({ positionY, rotationY }: LidProps) {
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
          ></mesh>
        )
      }
    }

    return blocks
  }, [])

  return (
    <>
      <Center position-y={positionY} rotation-y={rotationY}>
        {lidBlocks.map((lidBlock) => lidBlock)}
      </Center>
    </>
  )
}

// ========================
//  (Main) Cubii Component
// ========================

const AnimatedLid = animated(Lid)

function Cubii() {
  const { startAnimation, positionY, rotationY } = useLidAnimation()

  return (
    <>
      <group
        onClick={(e) => {
          e.stopPropagation()
          startAnimation()
        }}
        onPointerEnter={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <Walls />
        <Floor />
        <AnimatedLid positionY={positionY} rotationY={rotationY} />
      </group>
    </>
  )
}

const useLidAnimation = () => {
  const [open, setOpen] = useState(false)

  const [{ positionY, rotationY }, api] = useSpring(() => ({
    from: { positionY: 1.5, rotationY: 0 },
  }))

  const openingAnimation = () => {
    api.start({
      to: [
        {
          positionY: 3.5,
          config: {
            duration: 800,
            easing: easings.easeInOutBack,
          },
        },
        {
          rotationY: (Math.PI / 4) * 5,
          config: {
            duration: 500,
            easing: easings.easeOutCubic,
          },
        },
      ],
    })
  }

  const closingAnimation = () => {
    api.start({
      to: [
        {
          rotationY: 0,
          config: {
            duration: 500,
            easing: easings.easeInOutCubic,
          },
        },
        {
          positionY: 1.5,
          config: {
            duration: 800,
            easing: easings.easeInOutBack,
          },
        },
      ],
    })
  }

  const startAnimation = () => {
    if (open) {
      closingAnimation()
      setOpen(false)
    } else {
      openingAnimation()
      setOpen(true)
    }
  }

  return { startAnimation, positionY, rotationY }
}

export { Cubii }
