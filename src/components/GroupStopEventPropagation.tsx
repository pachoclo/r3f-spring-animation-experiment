import { GroupProps } from '@react-three/fiber'
import { ReactNode } from 'react'

type Props = { children: ReactNode } & GroupProps

export function GroupStopEventPropagation({ children, ...groupProps }: Props) {
  return (
    <group
      {...groupProps}
      onClick={(e) => {
        e.stopPropagation()
        groupProps.onClick?.(e)
      }}
      onPointerUp={(e) => {
        e.stopPropagation()
        groupProps.onPointerUp?.(e)
      }}
      onPointerEnter={(e) => {
        e.stopPropagation()
        groupProps.onPointerEnter?.(e)
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        groupProps.onPointerLeave?.(e)
      }}
    >
      {children}
    </group>
  )
}
