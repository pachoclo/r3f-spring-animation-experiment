import { BoxGeometry, MeshNormalMaterial } from 'three'

export const frontBackWallsGeometry = new BoxGeometry(4, 4, 1)
export const sideWallsGeometry = new BoxGeometry(2, 4, 1)
export const material = new MeshNormalMaterial()
