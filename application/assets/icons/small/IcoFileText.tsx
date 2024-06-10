import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoFileText = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={19}
    height={24}
    viewBox="0 0 19 24"
    {...props}
  >
    <G
      id="notes_1_"
      data-name="notes (1)"
      transform="translate(-2)"
      opacity={0.697}
    >
      <Path
        id="Path_143"
        data-name="Path 143"
        d="M6.75,5.5a1,1,0,0,1-1-1V1a1,1,0,0,1,2,0V4.5A1,1,0,0,1,6.75,5.5Z"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_144"
        data-name="Path 144"
        d="M11.5,5.5a1,1,0,0,1-1-1V1a1,1,0,0,1,2,0V4.5A1,1,0,0,1,11.5,5.5Z"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_145"
        data-name="Path 145"
        d="M16.25,5.5a1,1,0,0,1-1-1V1a1,1,0,0,1,2,0V4.5A1,1,0,0,1,16.25,5.5Z"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_146"
        data-name="Path 146"
        d="M18.25,2.25H4.75A2.752,2.752,0,0,0,2,5V21.25A2.752,2.752,0,0,0,4.75,24h13.5A2.752,2.752,0,0,0,21,21.25V5A2.752,2.752,0,0,0,18.25,2.25ZM7,8h5a1,1,0,0,1,0,2H7A1,1,0,0,1,7,8ZM17,18H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Zm0-4H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default IcoFileText;
