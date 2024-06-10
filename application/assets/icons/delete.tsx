import * as React from "react";
import Svg, { Path,SvgProps } from "react-native-svg";
    import { getColorScheme } from 'application/styles/colors';
    import UseEventService from 'application/store/services/UseEventService';
    const SVGComponent = (props: SvgProps) => {
        const { event } = UseEventService()
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 16 18.022"
    {...props}
  >
    <Path
      id="delete_24dp_FILL0_wght200_GRAD0_opsz24"
      d="M202.989-772.748a1.78,1.78,0,0,1-1.307-.539,1.781,1.781,0,0,1-.539-1.307v-14.154H200v-1.143h4.571v-.879h6.857v.879H216v1.143h-1.143v14.154a1.788,1.788,0,0,1-.529,1.318,1.788,1.788,0,0,1-1.318.529Zm10.725-16H202.286v14.154a.685.685,0,0,0,.2.506.686.686,0,0,0,.506.2h10.022a.672.672,0,0,0,.484-.22.672.672,0,0,0,.22-.484Zm-8.22,12.571h1.143v-10.286h-1.143Zm3.868,0h1.143v-10.286h-1.143Zm-7.077-12.571v0Z"
      transform="translate(-200 790.77)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
} 

export default SVGComponent;
