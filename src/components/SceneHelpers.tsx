import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export const SceneHelpers = () => {
  const { performance, axes, grid } = useControls('Helpers', {
    performance: false,
    axes: false,
    grid: false,
  })

  return (
    <>
      {performance && <Perf position='top-left' />}
      <axesHelper args={[20]} visible={axes} />
      <gridHelper visible={grid} rotation-x={Math.PI / 2} />
    </>
  )
}
