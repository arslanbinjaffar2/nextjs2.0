import * as React from "react";
import { getColorScheme } from "application/styles/colors";
import UseEventService from "application/store/services/UseEventService";
import Svg, { SvgProps, G, Path } from 'react-native-svg';
const SVGComponent = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);

  return (
    <Svg
      width={24.501}
      height={24.501}
      viewBox="0 0 24.501 24.501"
      {...props}
    >
      <G id="cancel_1_" data-name="cancel (1)" transform="translate(0 -0.001)">
        <G id="Group_638" data-name="Group 638" transform="translate(0 0.001)">
          <Path
            id="Path_279"
            data-name="Path 279"
            d="M14.074,12.251,24.123,2.2A1.29,1.29,0,1,0,22.3.379L12.25,10.428,2.2.379A1.29,1.29,0,1,0,.378,2.2L10.427,12.251.378,22.3A1.29,1.29,0,0,0,2.2,24.124L12.25,14.075,22.3,24.124A1.29,1.29,0,0,0,24.123,22.3Z"
            transform="translate(0 -0.001)"
            fill={props.color ? props.color : colors.text}
          />
        </G>
      </G>
    </Svg>
  );
}
export default SVGComponent;
