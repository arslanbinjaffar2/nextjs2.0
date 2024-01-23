import * as React from 'react';
import Svg, {G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoBack = () => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  const fill = colors.text ? colors.text : '#fff';

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <G
        data-name="Group 650"
        transform="rotate(180 350.485 211.485)"
        fill="none"
      >
        <Path
          data-name="Path 279"
          d="M685.232 419.813l8.85-8.681-8.85-8.392"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <Path
          data-name="Rectangle 121"
          transform="translate(676.97 398.97)"
          d="M0 0H24V24H0z"
        />
      </G>
    </Svg>
  );
};


export default IcoBack;