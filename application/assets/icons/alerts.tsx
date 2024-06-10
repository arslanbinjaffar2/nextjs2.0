import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const alerts = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
  <Svg
     width={props.width}
     height={props.height} viewBox="0 0 24.632 20.51">
      <G id="_1" data-name="1" transform="translate(-3.199 -8.013)">
      <G id="Group_18" data-name="Group 18" transform="translate(3.699 8.695)">
        <Path id="Path_39" data-name="Path 39" d="M3.081,41.1H6.67l20.042-6.326V53.918L6.67,47.561H3.081Z" transform="translate(-3.081 -34.773)"  fill='transparent' 
        stroke={props.color ? props.color : colors.text} strokeWidth="1"/>
        <Path id="Path_40" data-name="Path 40" d="M15.719,52.7a3.136,3.136,0,0,0,2.347,3.7c2.935.737,3.764-2.315,3.764-2.315" transform="translate(-10.577 -39.103)" 
         fill={props.color ? props.color : colors.text} stroke={props.color ? props.color : colors.text} strokeWidth="1"/>
      </G>
    </G>
  </Svg>
)};

export default alerts;
