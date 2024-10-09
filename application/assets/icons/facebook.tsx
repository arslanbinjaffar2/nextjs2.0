import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
    const SVGComponent = (props: SvgProps) => {
        const { event } = UseEventService()
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
    <Svg  viewBox="0 0 320 512" {...props}
    width={props.width}
    height={props.height}
    >
    <Path
      d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
    }
export default SVGComponent;
