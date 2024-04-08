import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';



const IcoDashboard = (props: SvgProps) => {
  
const { event } = UseEventService()
const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 64.004 64.004"
    {...props}
  >
    <G id="Group_668" data-name="Group 668" transform="translate(-256 -209)">
      <Path
        id="Path_1598"
        data-name="Path 1598"
        d="M24,29.335H5.334A5.339,5.339,0,0,1,0,24V5.334A5.339,5.339,0,0,1,5.334,0H24a5.339,5.339,0,0,1,5.334,5.334V24A5.339,5.339,0,0,1,24,29.335M5.334,2.667A2.671,2.671,0,0,0,2.667,5.334V24a2.671,2.671,0,0,0,2.667,2.667H24A2.671,2.671,0,0,0,26.668,24V5.334A2.671,2.671,0,0,0,24,2.667Z"
        transform="translate(256 209)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1599"
        data-name="Path 1599"
        d="M24,42.335H5.334A5.339,5.339,0,0,1,0,37V18.334A5.339,5.339,0,0,1,5.334,13H24a5.339,5.339,0,0,1,5.334,5.334V37A5.339,5.339,0,0,1,24,42.335M5.334,15.667a2.671,2.671,0,0,0-2.667,2.667V37a2.671,2.671,0,0,0,2.667,2.667H24A2.671,2.671,0,0,0,26.668,37V18.334A2.671,2.671,0,0,0,24,15.667Z"
        transform="translate(256 230.669)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1600"
        data-name="Path 1600"
        d="M37,29.335H18.334A5.339,5.339,0,0,1,13,24V5.334A5.339,5.339,0,0,1,18.334,0H37a5.339,5.339,0,0,1,5.334,5.334V24A5.339,5.339,0,0,1,37,29.335M18.334,2.667a2.671,2.671,0,0,0-2.667,2.667V24a2.671,2.671,0,0,0,2.667,2.667H37A2.671,2.671,0,0,0,39.668,24V5.334A2.671,2.671,0,0,0,37,2.667Z"
        transform="translate(277.669 209)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1601"
        data-name="Path 1601"
        d="M37,42.335H18.334A5.339,5.339,0,0,1,13,37V18.334A5.339,5.339,0,0,1,18.334,13H37a5.339,5.339,0,0,1,5.334,5.334V37A5.339,5.339,0,0,1,37,42.335M18.334,15.667a2.671,2.671,0,0,0-2.667,2.667V37a2.671,2.671,0,0,0,2.667,2.667H37A2.671,2.671,0,0,0,39.668,37V18.334A2.671,2.671,0,0,0,37,15.667Z"
        transform="translate(277.669 230.669)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default IcoDashboard;
