import * as React from "react"
import { SVGProps } from "react"

interface PathBookmarkProps extends SVGProps<SVGSVGElement> {
    className: string;
}
const PathBookmark = ({className, ...props}: PathBookmarkProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 14"
    fill="none"
    className={className}
    {...props}
  >
    <path
    //   stroke="#fff"
      className="fill-stroke"
      strokeWidth={1.5}
      d="M1.058.75h9.551c.038 0 .07.007.102.021l.01.004.01.004a.283.283 0 0 1 .14.108.244.244 0 0 1 .046.15v11.927a.244.244 0 0 1-.047.15.283.283 0 0 1-.139.107l-.007.003-.008.003a.29.29 0 0 1-.107.014.327.327 0 0 1-.191-.053l-.055-.043-4.006-3.91-.524-.511-.523.51-4.007 3.912a.33.33 0 0 1-.245.104.248.248 0 0 1-.103-.021l-.01-.004-.01-.004-.082-.047a.272.272 0 0 1-.057-.06.244.244 0 0 1-.046-.15V1.036c0-.058.013-.102.046-.15A.282.282 0 0 1 .935.78l.01-.004.01-.004A.249.249 0 0 1 1.058.75Z"
    />
  </svg>
)
export default PathBookmark
