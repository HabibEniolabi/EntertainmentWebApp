import * as React from "react"
import { SVGProps } from "react"

interface TvSeriesProps extends SVGProps<SVGSVGElement> {
  className?: string;
}
const TvSeries = ({className, ...props}: TvSeriesProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
    fill="none"
    {...props}
  >
    <path
      // fill="#fff"
      className="fill-current"
      fillRule="evenodd"
      d="M9.08 4.481H20V20H0V4.481h4.92l-2.7-3.278L3.78.029 7 3.91 10.22 0l1.56 1.203-2.7 3.278ZM2 6.421v11.64h10V6.42H2Zm15 7.76h-2v-1.94h2v1.94Zm-2-3.88h2V8.36h-2v1.94Z"
      clipRule="evenodd"
    />
  </svg>
)
export default TvSeries
