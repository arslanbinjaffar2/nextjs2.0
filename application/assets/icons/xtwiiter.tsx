import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
    const SVGComponent = (props: SvgProps) => {
        const { event } = UseEventService()
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
    <Svg viewBox="0 0 512 512" {...props}  width={props.width}
    height={props.height}>
    <Path
       fill={props.color ? props.color : colors.text}
    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </Svg>
);
    }
export default SVGComponent;
