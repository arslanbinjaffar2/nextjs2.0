import * as React from "react";
import Svg, { Path,SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
    viewBox="0 0 10.989 14"
    {...props}
  >
    <Path
      id="play_arrow_FILL1_wght100_GRAD0_opsz24"
      d="M372-652v-14l10.989,7Z"
      transform="translate(-372 666)"
      fill="#eaeaea"
    />
  </Svg>
);
export default SVGComponent;
