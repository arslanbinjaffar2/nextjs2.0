import * as React from "react";
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const upcoming_events = (props:SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
   <Svg
    width={23.735}
    height={24.43}
    viewBox="0 0 23.735 24.43"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4127"
          data-name="Rectangle 4127"
          width={23.735}
          height={24.43}
          transform="translate(0 0)"
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G id="Group_5695" data-name="Group 5695" transform="translate(0 0)">
      <G id="Group_5693" data-name="Group 5693">
        <Path
          id="Path_2377"
          data-name="Path 2377"
          d="M22.872,3.31a2.934,2.934,0,0,0-2.089-.866H16.254V.5a.5.5,0,0,0-1,0V2.444H9.477V.5a.5.5,0,0,0-1,0V2.444H2.952A2.957,2.957,0,0,0,0,5.4V21.47a2.953,2.953,0,0,0,2.952,2.956h.14c.01,0,.02,0,.03,0H18.279v0h2.5a2.953,2.953,0,0,0,2.957-2.951V5.4a2.937,2.937,0,0,0-.863-2.09m-.137,13.832v4.332a1.951,1.951,0,0,1-1.956,1.952H3.092A2.119,2.119,0,0,1,1,21.307V5.567A2.126,2.126,0,0,1,3.123,3.444H8.477V5.018a.5.5,0,0,0,1,0V3.444h5.777V5.018a.5.5,0,0,0,1,0V3.444h4.357a2.126,2.126,0,0,1,2.123,2.123h0V17.142Z"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_2378"
          data-name="Path 2378"
          d="M19.518,7.472H4.653a.5.5,0,0,0,0,1H19.518a.5.5,0,0,0,0-1"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_2379"
          data-name="Path 2379"
          d="M9.662,12.389l5.051,0L6.686,20.418l.645.645,8.018-8.017V18.1l.905-.016V11.495H9.662Z"
          fill={props.color ? props.color : colors.text}
        />
      </G>
    </G>
  </Svg>
)};
export default upcoming_events;
