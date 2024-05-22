import * as React from "react";
import Svg, { G, Path,SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
  
  <Svg
    id="send-mail-2574"
    width={props.width}
    height={props.height}
    viewBox="0 0 25.776 15.041"
    {...props}
  >
    <G id="Group_878" data-name="Group 878">
      <Path
        id="Path_1626"
        data-name="Path 1626"
        d="M70.93,67.533H55.064a2.257,2.257,0,0,1-2.255-2.255v-2.91a.43.43,0,0,1,.859,0v2.91a1.4,1.4,0,0,0,1.4,1.4H70.93a1.4,1.4,0,0,0,1.4-1.4V54.747a1.4,1.4,0,0,0-1.4-1.4H55.064a1.4,1.4,0,0,0-1.4,1.4v2.875a.43.43,0,1,1-.859,0V54.747a2.257,2.257,0,0,1,2.255-2.255H70.93a2.257,2.257,0,0,1,2.255,2.255V65.278A2.257,2.257,0,0,1,70.93,67.533Z"
        transform="translate(-47.409 -52.493)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1627"
        data-name="Path 1627"
        d="M88.431,80.9l4.79-4.395a.43.43,0,1,0-.581-.633l-6.875,6.307-6.874-6.307a.43.43,0,1,0-.581.633L83.1,80.9,78.31,85.3a.43.43,0,0,0,.581.633l4.845-4.445,1.739,1.6a.429.429,0,0,0,.581,0l1.739-1.6,4.845,4.445a.429.429,0,1,0,.581-.633Z"
        transform="translate(-70.178 -73.384)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1628"
        data-name="Path 1628"
        d="M22.466,122.694H17.344a.43.43,0,1,1,0-.859h5.122a.43.43,0,1,1,0,.859Z"
        transform="translate(-15.184 -114.744)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1629"
        data-name="Path 1629"
        d="M3.579,93.33H.43a.43.43,0,0,1,0-.859h3.15a.43.43,0,0,1,0,.859Z"
        transform="translate(0 -88.383)"
        fill={props.color ? props.color : colors.text}

      />
      <Path
        id="Path_1630"
        data-name="Path 1630"
        d="M10.856,152.058H8.535a.43.43,0,1,1,0-.859h2.321a.43.43,0,1,1,0,.859Z"
        transform="translate(-7.277 -141.105)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
);
}

export default SVGComponent;
