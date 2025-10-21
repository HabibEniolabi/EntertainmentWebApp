import * as React from "react"
import { SVGProps } from "react"

interface SearchProps extends SVGProps<SVGSVGElement> {
    primaryColor?: string;
    secondaryColor?: string;
}
const Search = ({primaryColor, secondaryColor, ...props}: SearchProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <path 
        // fill="#000" 
        fill={secondaryColor || "#000"}
        d="M0 0h32v32H0z" 
        opacity={0.01} 
    />
    <path
    //   fill="#fff"
      fill={primaryColor || "#fff"}
      fillRule="evenodd"
      d="m23.08 21.2 4.533 4.52a1.333 1.333 0 0 1 0 1.893 1.333 1.333 0 0 1-1.893 0L21.2 23.08a10.56 10.56 0 0 1-6.533 2.253C8.776 25.333 4 20.558 4 14.667S8.776 4 14.667 4c5.89 0 10.666 4.776 10.666 10.667A10.56 10.56 0 0 1 23.08 21.2ZM14.667 6.667a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Search
