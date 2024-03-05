import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoribbon = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 20.538 30.229"
  >
    <G
      id="Group_754"
      data-name="Group 754"
      transform="translate(-995.98 -273.503)"
    >
      <Path
        id="Path_1582"
        data-name="Path 1582"
        d="M6765.208,387.717v19.835l7.993-7.615,7.3,7.615V391.74"
        transform="translate(-5768.228 -106.308)"
        fill="none"
        stroke={props.color ? props.color : colors.text}
        strokeWidth={2}
      />
      <Path
        id="Icon_awesome-check-circle"
        data-name="Icon awesome-check-circle"
        d="M11.438,6A5.438,5.438,0,1,1,6,.563,5.437,5.437,0,0,1,11.438,6ZM5.371,8.879,9.405,4.845a.351.351,0,0,0,0-.5l-.5-.5a.351.351,0,0,0-.5,0l-3.29,3.29L3.587,5.607a.351.351,0,0,0-.5,0l-.5.5a.351.351,0,0,0,0,.5l2.28,2.28A.351.351,0,0,0,5.371,8.879Z"
        transform="translate(1005.081 272.94)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1583"
        data-name="Path 1583"
        d="M6966.98,282.567V271.618h8.663"
        transform="translate(-5970 2.884)"
        fill="none"
        stroke={props.color ? props.color : colors.text}
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </G>
  </Svg>
)};

export default Icoribbon;
