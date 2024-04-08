import * as React from "react";
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const reservation = (props:SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
   <Svg
    width={24.001}
    height={24}
    viewBox="0 0 24.001 24"
    {...props}
  >
    <Path
      id="Union_24"
      data-name="Union 24"
      d="M3429.5-3648a3.5,3.5,0,0,1-3.5-3.5v-15a3.5,3.5,0,0,1,3.5-3.5h4.977v-1.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v1.5h5.776v-1.5a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v1.5h4.247a3.5,3.5,0,0,1,3.5,3.5v15a3.5,3.5,0,0,1-3.5,3.5Zm-2.5-18.5v15a2.5,2.5,0,0,0,2.5,2.5h17a2.5,2.5,0,0,0,2.5-2.5v-15a2.5,2.5,0,0,0-2.5-2.5h-4.247v2.017a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-3669h-5.776v2.017a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V-3669H3429.5A2.5,2.5,0,0,0,3427-3666.5Zm4,9.665.577-.577,3.442,3.441,7.4-7.4.577.577-7.981,7.982Zm-.347-6.692a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h14.866a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5Z"
      transform="translate(-3426 3672)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};
export default reservation;
