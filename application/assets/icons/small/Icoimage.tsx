import * as React from 'react';
import Svg, { SvgProps, G, Rect, Ellipse, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoimage = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={25.627}
    height={20.79}
    viewBox="0 0 25.627 20.79"
    {...props}
  >
    <G
      id="Group_842"
      data-name="Group 842"
      transform="translate(-60.312 -232.961)"
    >
      <G
        id="Rectangle_51"
        data-name="Rectangle 51"
        transform="translate(60.312 232.961)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      >
        <Rect width={25.627} height={20.695} rx={5} stroke="none" />
        <Rect
          x={0.5}
          y={0.5}
          width={24.627}
          height={19.695}
          rx={4.5}
          fill="none"
        />
      </G>
      <G
        id="Ellipse_2"
        data-name="Ellipse 2"
        transform="translate(63.849 236.33)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      >
        <Ellipse cx={2.021} cy={2.021} rx={2.021} ry={2.021} stroke="none" />
        <Ellipse cx={2.021} cy={2.021} rx={1.521} ry={1.521} fill="none" />
      </G>
      <Path
        id="Path_51"
        data-name="Path 51"
        d="M0,13.583,8.151,2.932,11.4,7.185,16.011,0,21.34,7.185"
        transform="translate(64.19 239.865)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
    </G>
  </Svg>
)};

export default Icoimage;
