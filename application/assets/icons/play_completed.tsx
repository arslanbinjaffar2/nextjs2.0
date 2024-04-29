import * as React from "react";
import Svg, { G, Circle, Path,SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 36 36"
    {...props}
  >
    <G id="Group_3673" data-name="Group 3673" transform="translate(-496 -801)">
      <G
        id="Ellipse_137"
        data-name="Ellipse 137"
        transform="translate(496 801)"
        fill="rgba(0,0,0,0.4)"
        stroke="#eaeaea"
        strokeWidth={1}
      >
        <Circle cx={18} cy={18} r={18} stroke="none" />
        <Circle cx={18} cy={18} r={17.5} fill="none" />
      </G>
      <Path
        id="play_arrow_FILL1_wght100_GRAD0_opsz24"
        d="M372-652v-14l10.989,7Z"
        transform="translate(136.932 1478)"
        fill="#eaeaea"
      />
    </G>
  </Svg>
);
export default SVGComponent;
