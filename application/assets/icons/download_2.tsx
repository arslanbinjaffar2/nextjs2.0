import * as React from "react";
import Svg, { Defs, SvgProps, ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      id="download_FILL0_wght100_GRAD0_opsz24_1_"
      data-name="download_FILL0_wght100_GRAD0_opsz24 (1)"
      d="M220-735.881l-3.7-3.7.6-.6,2.687,2.687V-748h.836v10.508l2.687-2.687.6.6ZM213.791-732a1.739,1.739,0,0,1-1.284-.507,1.74,1.74,0,0,1-.507-1.284v-2.687h.836v2.687a.913.913,0,0,0,.3.657.913.913,0,0,0,.657.3h12.418a.913.913,0,0,0,.657-.3.913.913,0,0,0,.3-.657v-2.687H228v2.687a1.74,1.74,0,0,1-.507,1.284,1.739,1.739,0,0,1-1.284.507Z"
      transform="translate(-212 748)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
}
export default SVGComponent;
