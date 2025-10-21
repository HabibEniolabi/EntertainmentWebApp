import * as React from "react"
import { SVGProps } from "react"

interface MovieListProps extends SVGProps<SVGSVGElement> {
    className?: string;
}
const MovieList = ({className,...props}: MovieListProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 26"
    fill="none"
    className={className}
    {...props}
  >
    <path
    //   fill="#FC4747"
    className="fill-current"
      d="m25.6 0 3.2 6.4H24L20.8 0h-3.2l3.2 6.4H16L12.8 0H9.6l3.2 6.4H8L4.8 0H3.2A3.186 3.186 0 0 0 .016 3.2L0 22.4a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V0h-6.4Z"
    />
  </svg>
)
export default MovieList
