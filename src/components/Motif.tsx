import type { SVGProps } from 'react'

type MotifProps = SVGProps<SVGSVGElement> & {
  id: string
}

export function Motif({ id, ...props }: MotifProps) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`#${id}`} />
    </svg>
  )
}
