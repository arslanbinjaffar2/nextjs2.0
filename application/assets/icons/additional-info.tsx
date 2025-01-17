import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const additional_info = (props: SvgProps) => {
const { event } = UseEventService()
const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);

  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 51.544 63.861"
  >
    <G
      id="Group_682"
      data-name="Group 682"
      transform="translate(-654.174 -249.682)"
    >
      <Path
        id="Path_1634"
        data-name="Path 1634"
        d="M46.118,46.123H5.425A5.431,5.431,0,0,1,0,40.7V15.783a5.431,5.431,0,0,1,5.425-5.425H46.118a5.431,5.431,0,0,1,5.425,5.425V40.7a5.431,5.431,0,0,1-5.425,5.425M5.425,13.071a2.717,2.717,0,0,0-2.713,2.713V40.7A2.715,2.715,0,0,0,5.425,43.41H46.118A2.715,2.715,0,0,0,48.831,40.7V15.783a2.717,2.717,0,0,0-2.713-2.713Z"
        transform="translate(654.174 267.42)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1635"
        data-name="Path 1635"
        d="M13.369,11.745a5.873,5.873,0,1,1,5.873-5.873,5.88,5.88,0,0,1-5.873,5.873m0-9.033a3.16,3.16,0,1,0,3.16,3.16,3.163,3.163,0,0,0-3.16-3.16"
        transform="translate(667.011 249.682)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1636"
        data-name="Path 1636"
        d="M33.393,22.3l-5.1-12.96a3.154,3.154,0,0,0-2.414-2.2l-6.681,4.788L13,7.146a3.11,3.11,0,0,0-2.409,2.246L6.086,22.25l-2.558-.9L8,8.587a5.772,5.772,0,0,1,5.33-4.2l.5-.024,5.428,4.191,5.837-4.188.469.022a5.817,5.817,0,0,1,5.284,4.053l5.072,12.871Z"
        transform="translate(660.216 257.145)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1637"
        data-name="Path 1637"
        d="M7.186,16.811a1.357,1.357,0,0,1-1.245-1.893l2.71-6.3a1.355,1.355,0,1,1,2.49,1.071l-2.71,6.3a1.355,1.355,0,0,1-1.245.819"
        transform="translate(664.158 263.04)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1638"
        data-name="Path 1638"
        d="M14.891,16.812a1.355,1.355,0,0,1-1.245-.819l-2.71-6.3a1.355,1.355,0,1,1,2.49-1.071l2.71,6.3a1.357,1.357,0,0,1-1.245,1.893"
        transform="translate(672.712 263.039)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1639"
        data-name="Path 1639"
        d="M10.61,17.936a2.314,2.314,0,1,1,2.314-2.314,2.318,2.318,0,0,1-2.314,2.314m0-2.713a.4.4,0,0,0-.4.4c0,.439.8.439.8,0a.4.4,0,0,0-.4-.4"
        transform="translate(668.381 272.472)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1640"
        data-name="Path 1640"
        d="M17.033,32.958H9.295a1.949,1.949,0,0,1-1.948-1.948V28.189A1.952,1.952,0,0,1,9.2,26.242v-4a1.951,1.951,0,0,1-1.828-1.926L7.35,17.429a1.952,1.952,0,0,1,1.926-1.964h5.87a1.949,1.949,0,0,1,1.948,1.948v8.8a1.949,1.949,0,0,1,1.888,1.945v2.856a1.949,1.949,0,0,1-1.948,1.948M10.06,30.246h6.209V28.922H14.381V18.178H10.068l.014,1.356h1.834v9.418H10.06Z"
        transform="translate(666.756 276.166)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default additional_info;
