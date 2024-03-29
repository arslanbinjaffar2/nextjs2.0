// eslint-disable-next-line quotes
import * as React from "react";
import Svg, { SvgProps, Defs, Line, Circle, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const myagendas = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
<Svg
    width={24.984}
    height={24.431}
    viewBox="0 0 24.984 24.431"
    {...props}
  >
    <G id="program" transform="translate(0.5 0.57)">
      <Path
        id="Path_32"
        data-name="Path 32"
        d="M-97.221,396.986h-15.155A2.623,2.623,0,0,1-115,394.363v-15.74A2.623,2.623,0,0,1-112.377,376h17.488a2.623,2.623,0,0,1,2.623,2.623"
        transform="translate(115 -373.626)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
      <Path
        id="Path_33"
        data-name="Path 33"
        d="M-97.427,397.483h2.809l-17.43,0a2.454,2.454,0,0,1-2.452-2.456V378.956a2.454,2.454,0,0,1,2.452-2.456h17.831a2.454,2.454,0,0,1,2.452,2.456v10.387"
        transform="translate(114.5 -374.126)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
      <G id="Group_11" data-name="Group 11" transform="translate(8.477 -0.07)">
        <Line
          id="Line_18"
          data-name="Line 18"
          y2={4.518}
          transform="translate(0)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeLinecap="round"
          strokeWidth={1}
        />
        <Line
          id="Line_19"
          data-name="Line 19"
          y2={4.518}
          transform="translate(6.777)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeLinecap="round"
          strokeWidth={1}
        />
      </G>
      <Line
        id="Line_20"
        data-name="Line 20"
        x2={14.865}
        transform="translate(4.153 7.402)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeLinecap="round"
        strokeWidth={1}
      />
      <G
        id="Ellipse_1"
        data-name="Ellipse 1"
        transform="translate(13.554 12.867)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      >
        <Circle cx={5.465} cy={5.465} r={5.465} stroke="none" />
        <Circle cx={5.465} cy={5.465} r={4.965} fill="none" />
      </G>
      <Path
        id="Icon_awesome-heart"
        data-name="Icon awesome-heart"
        d="M5.122,2.587a1.515,1.515,0,0,0-2.068.151l-.218.225-.218-.225A1.515,1.515,0,0,0,.55,2.587a1.591,1.591,0,0,0-.11,2.3L2.584,7.1a.347.347,0,0,0,.5,0L5.231,4.891a1.59,1.59,0,0,0-.109-2.3Z"
        transform="translate(16.183 13.685)"
        fill="none"
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={1}
      />
    </G>
  </Svg>

)};

export default myagendas;
