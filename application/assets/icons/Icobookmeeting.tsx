import * as React from "react";
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from "application/styles/colors";
import UseEventService from "application/store/services/UseEventService";

const SVGComponent = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);

  return (
    
    <Svg
    width={props.width ? props.width : 22}
    height={props.height ? props.height : 24.178}
    viewBox="0 0 22 24.178"
    {...props}
  >
    <Path
      id="Union_23"
      data-name="Union 23"
      d="M12.015,20.521l.887-.886,2.736,2.737L21.113,16.9l.887.919-6.329,6.362ZM2.081,23.484A2.037,2.037,0,0,1,0,21.4V4.955A2.037,2.037,0,0,1,2.081,2.874H4.36V0H5.747V2.874h9.215V0h1.289V2.874H18.53a2.035,2.035,0,0,1,2.08,2.081v7.362l-1.288,1.321v-3.53H1.288V21.4a.762.762,0,0,0,.248.545.758.758,0,0,0,.545.248h6.54l1.33,1.288ZM19.322,8.819V4.955a.757.757,0,0,0-.248-.545.756.756,0,0,0-.545-.248H2.081a.758.758,0,0,0-.545.248.76.76,0,0,0-.248.545V8.819ZM1.288,4.955v0ZM3.156,18.087a1.336,1.336,0,1,1,1.336,1.336A1.336,1.336,0,0,1,3.156,18.087ZM14.81,13.474a1.336,1.336,0,1,1,1.336,1.336A1.335,1.335,0,0,1,14.81,13.474Zm-5.826,0a1.335,1.335,0,1,1,1.335,1.336A1.335,1.335,0,0,1,8.983,13.474Zm-5.827,0A1.336,1.336,0,1,1,4.492,14.81,1.335,1.335,0,0,1,3.156,13.474Z"
      fill={colors.text ? colors.text : "#fff"}
    />
  </Svg>
  );
}
export default SVGComponent;