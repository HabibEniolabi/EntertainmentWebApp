import * as React from "react"
import { SVGProps } from "react"

interface TrendingProps extends SVGProps<SVGSVGElement> {
    color: string;
}
const Trending = ({color, ...props}: TrendingProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M1 0h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1Zm0 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H1c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-7 11h7c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-7c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Trending
