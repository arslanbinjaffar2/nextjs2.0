import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoMessagealt = (props: SvgProps) => {
  
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    
    width={10.126}
    height={10.126}
    viewBox="0 0 10.126 10.126"
    {...props}
  >
    <G id="chat-2" transform="translate(0 -4.494)">
      <G id="Group_5" data-name="Group 5" transform="translate(0 4.494)">
        <Path
          id="Path_7"
          data-name="Path 7"
          d="M5.063,0A5.069,5.069,0,0,0,0,5.063V9.809a.317.317,0,0,0,.316.316H5.063A5.063,5.063,0,0,0,5.063,0Zm.316,6.329H2.848a.316.316,0,1,1,0-.633H5.379a.316.316,0,1,1,0,.633Zm1.9-1.9H2.848a.316.316,0,1,1,0-.633h4.43a.316.316,0,1,1,0,.633Z"
          fill={colors.text ? colors.text : '#fff'}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoMessagealt;
