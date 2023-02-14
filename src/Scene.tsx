import { OrbitControls } from '@react-three/drei'
import { Cubii } from './components/Cubii'
import { SceneHelpers } from './components/SceneHelpers'

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
