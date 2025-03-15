import { SceneHelpers } from '@/components/SceneHelpers'
import { OrbitControls } from '@react-three/drei'
import { Cubii } from './Cubii/Cubii'

function Scene() {
  return (
    <>
      <SceneHelpers />
      <OrbitControls makeDefault />
      <Cubii />
    </>
  )
}

export { Scene }
