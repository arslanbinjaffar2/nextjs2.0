import UseEventService from "application/store/services/UseEventService";
import { getColorScheme } from "application/styles/colors";
import * as React from "react";
import Svg, { Path,SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => {
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
      id="upload_FILL0_wght300_GRAD0_opsz48"
      d="M181.54,285.078a1.488,1.488,0,0,1-1.083-.45,1.454,1.454,0,0,1-.456-1.071v-3.283h1.21v3.283a.309.309,0,0,0,.1.223.315.315,0,0,0,.226.1h12.923a.315.315,0,0,0,.226-.1.308.308,0,0,0,.1-.223v-3.283H196v3.283a1.454,1.454,0,0,1-.456,1.071,1.488,1.488,0,0,1-1.083.45Zm5.856-3.962V271.4l-2.944,2.9-.87-.85L188,269.078l4.418,4.368-.87.85-2.944-2.9v9.72Z"
      transform="translate(-180.001 -269.078)"
      fill={props.color?props.color:colors.text}
    />
  </Svg>
);
}
export default SVGComponent;
