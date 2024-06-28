import * as React from "react";
import Svg, {SvgProps, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
     const { event } = UseEventService()
     const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
  <Svg
  width={props.width}
  height={props.height}
    viewBox="0 0 20 11"
    {...props}
  >
    <Path
      id="Polygon_12"
      data-name="Polygon 12"
      d="M7.78,2.442a3,3,0,0,1,4.44,0l3.218,3.54A3,3,0,0,1,13.218,11H6.782a3,3,0,0,1-2.22-5.018Z"
      transform="translate(20 11) rotate(180)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
}
export default SVGComponent;
