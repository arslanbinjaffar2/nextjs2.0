import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoSend = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width="200px"
    height="200px"
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path
      d="M14.5 0.5L14.9596 0.69696C15.0401 0.509038 14.9981 0.291016 14.8536 0.146447C14.709 0.00187701 14.491 -0.0401102 14.303 0.0404275L14.5 0.5ZM0.5 6.5L0.30304 6.04043C0.130457 6.11439 0.0138614 6.27881 0.00114754 6.46614C-0.0115663 6.65348 0.0817453 6.83214 0.242752 6.92875L0.5 6.5ZM8.5 14.5L8.07125 14.7572C8.16786 14.9183 8.34652 15.0116 8.53386 14.9989C8.72119 14.9861 8.88561 14.8695 8.95957 14.697L8.5 14.5ZM14.303 0.0404275L0.30304 6.04043L0.69696 6.95957L14.697 0.959573L14.303 0.0404275ZM0.242752 6.92875L5.24275 9.92875L5.75725 9.07125L0.757248 6.07125L0.242752 6.92875ZM5.07125 9.75725L8.07125 14.7572L8.92875 14.2428L5.92875 9.24275L5.07125 9.75725ZM8.95957 14.697L14.9596 0.69696L14.0404 0.30304L8.04043 14.303L8.95957 14.697ZM14.1464 0.146447L5.14645 9.14645L5.85355 9.85355L14.8536 0.853553L14.1464 0.146447Z"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default IcoSend;
