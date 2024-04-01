import * as React from 'react';
import Svg, { SvgProps, G, Rect, Ellipse, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icovideo = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={30.905}
    height={18.089}
    viewBox="0 0 30.905 18.089"
    {...props}
  >
    <G
      id="Icon_ionic-ios-videocam"
      data-name="Icon ionic-ios-videocam"
      transform="translate(-1.75 -8.5)"
    >
      <Path
        id="Path_1609"
        data-name="Path 1609"
        d="M31.328,10.8a1.14,1.14,0,0,0-.621.18l-5.774,3.645a.571.571,0,0,0-.267.481v5.073a.571.571,0,0,0,.267.481L30.707,24.3a1.2,1.2,0,0,0,.621.18h1.388a.568.568,0,0,0,.574-.567V11.367a.573.573,0,0,0-.574-.567Z"
        transform="translate(-1.135 -0.091)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
      <Path
        id="Path_1610"
        data-name="Path 1610"
        d="M18.371,26.089H5.688A3.449,3.449,0,0,1,2.25,22.658V12.431A3.443,3.443,0,0,1,5.681,9H18.364A3.443,3.443,0,0,1,21.8,12.431v10.22A3.434,3.434,0,0,1,18.371,26.089Z"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
    </G>
  </Svg>
)};

export default Icovideo;
