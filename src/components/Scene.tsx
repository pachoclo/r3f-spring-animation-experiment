import { OrbitControls } from '@react-three/drei'

import { Cubii } from './Cubii'
import { SceneHelpers } from './SceneHelpers'

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
