import { create } from 'zustand'

type WallState = 'closed' | 'opening' | 'open' | 'closing'
type LidState = 'closed' | 'opening' | 'open' | 'closing'

type CubbiStore = {
  lidState: LidState
  lidIsPeeking: boolean
  lidHasBeenOpened: boolean

  frontWallState: WallState
  backWallState: WallState
  leftWallState: WallState
  rightWallState: WallState

  // actions
  setLidState: (state: LidState) => void
  setLidIsPeeking: (isPeeking: boolean) => void
  setLidHasBeenOpened: (hasBeenOpened: boolean) => void

  setFrontWallState: (state: WallState) => void
  setBackWallState: (state: WallState) => void
  setLeftWallState: (state: WallState) => void
  setRightWallState: (state: WallState) => void
}

const useCubiiStore = create<CubbiStore>()((set) => ({
  lidState: 'closed',
  lidIsPeeking: false,
  lidHasBeenOpened: false,

  frontWallState: 'closed',
  backWallState: 'closed',
  leftWallState: 'closed',
  rightWallState: 'closed',

  // actions
  setLidState: (state: LidState) => set(() => ({ lidState: state })),
  setLidIsPeeking: (isPeeking: boolean) => set(() => ({ lidIsPeeking: isPeeking })),
  setLidHasBeenOpened: (hasBeenOpened: boolean) => set(() => ({ lidHasBeenOpened: hasBeenOpened })),

  setFrontWallState: (state: WallState) => set(() => ({ frontWallState: state })),
  setBackWallState: (state: WallState) => set(() => ({ backWallState: state })),
  setLeftWallState: (state: WallState) => set(() => ({ leftWallState: state })),
  setRightWallState: (state: WallState) => set(() => ({ rightWallState: state })),
}))

export { useCubiiStore }
