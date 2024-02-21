import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoLink = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={23.636}
    height={23.581}
    viewBox="0 0 23.636 23.581"
    {...props}
  >
    <G id="url" transform="translate(0 -0.588)" opacity={0.697}>
      <Path
        id="Path_140"
        data-name="Path 140"
        d="M152.885,6.514A6.482,6.482,0,0,0,153.9,16.3a.268.268,0,0,0,.335-.032,10.756,10.756,0,0,0,1.737-2.1.252.252,0,0,0-.1-.353,3.243,3.243,0,0,1-1.243-1.28h0a3.121,3.121,0,0,1-.265-2.132h0c.2-.964,1.233-1.86,2.024-2.689l0,0,2.961-3.022a3.036,3.036,0,0,1,4.313-.022A3.074,3.074,0,0,1,163.7,9l-1.793,1.844a.314.314,0,0,0-.071.322,8.486,8.486,0,0,1,.238,4.161.036.036,0,0,0,.062.033l3.817-3.9a6.4,6.4,0,1,0-9.141-8.957L152.9,6.5l-.015.016Z"
        transform="translate(-144.13 0)"
        fill={colors.text ? colors.text : '#e3e3e3'}
      />
      <Path
        id="Path_141"
        data-name="Path 141"
        d="M15.889,179.169h0l.007,0a6.545,6.545,0,0,0,.567-4.65l0,0h0a6.424,6.424,0,0,0-2.589-3.694.354.354,0,0,0-.393.018,6.211,6.211,0,0,0-1.717,2.073.287.287,0,0,0,.114.375,3.211,3.211,0,0,1,1.23,1.255h0a2.94,2.94,0,0,1,.311,1.93h0c-.138,1.057-1.2,2.026-2.053,2.9h0c-.646.66-2.287,2.334-2.945,3.005a3.065,3.065,0,1,1-4.379-4.29l1.8-1.85a.314.314,0,0,0,.073-.317,8.943,8.943,0,0,1-.257-4.15.037.037,0,0,0-.062-.032l-3.759,3.837a6.5,6.5,0,0,0,.046,9.1,6.418,6.418,0,0,0,9.049-.092c.856-.957,4.518-4.348,4.96-5.412Z"
        transform="translate(0 -162.325)"
        fill={colors.text ? colors.text : '#e3e3e3'}
      />
    </G>
  </Svg>
)};

export default IcoLink;
