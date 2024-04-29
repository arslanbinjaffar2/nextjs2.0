import * as React from "react";
import Svg, { G, Path,SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 14 14"
    {...props}
  >
    <G id="cancel_1_" data-name="cancel (1)" transform="translate(0 -0.001)">
      <G id="Group_638" data-name="Group 638" transform="translate(0 0.001)">
        <Path
          id="Path_279"
          data-name="Path 279"
          d="M8.042,7l5.742-5.742A.737.737,0,1,0,12.742.217L7,5.959,1.258.217A.737.737,0,0,0,.216,1.259L5.958,7,.216,12.743a.737.737,0,1,0,1.042,1.042L7,8.043l5.742,5.742a.737.737,0,1,0,1.042-1.042Z"
          transform="translate(0 -0.001)"
          fill="#fff"
        />
      </G>
    </G>
  </Svg>
);
export default SVGComponent;
 

