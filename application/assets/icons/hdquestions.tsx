import * as React from "react";
import Svg, { SvgProps,G, Rect, Ellipse, Path, Line } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
    id="Group_1982"
    data-name="Group 1982"
    width={19.533}
    height={24}
    viewBox="0 0 19.533 24"
    {...props}
  >
    <G id="_1" data-name={1}>
      <G id="Group_40" data-name="Group 40">
        <G
          id="Rectangle_70"
          data-name="Rectangle 70"
          transform="translate(0 10.815)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeWidth={0.8}
        >
          <Rect width={19.533} height={13.185} rx={2} stroke="none" />
          <Rect
            x={0.4}
            y={0.4}
            width={18.733}
            height={12.385}
            rx={1.6}
            fill="none"
          />
        </G>
        <G
          id="Ellipse_3"
          data-name="Ellipse 3"
          transform="translate(7.767)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeWidth={0.8}
        >
          <Ellipse cx={2.165} cy={2.165} rx={2.165} ry={2.165} stroke="none" />
          <Ellipse cx={2.165} cy={2.165} rx={1.765} ry={1.765} fill="none" />
        </G>
        <Path
          id="Path_83"
          data-name="Path 83"
          d="M-173.5,195.423l1.729-4.706a1.717,1.717,0,0,1,1.59-1.217l2.254,1.66,2.427-1.66a1.707,1.707,0,0,1,1.564,1.145l1.972,4.778"
          transform="translate(177.499 -184.452)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeMiterlimit={10}
          strokeWidth={0.8}
        />
        <Line
          id="Line_37"
          data-name="Line 37"
          y1={2.322}
          x2={0.999}
          transform="translate(6.517 8.558)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeLinecap="round"
          strokeWidth={0.8}
        />
        <Line
          id="Line_38"
          data-name="Line 38"
          x2={0.999}
          y2={2.322}
          transform="translate(11.66 8.558)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeLinecap="round"
          strokeWidth={0.8}
        />
      </G>
    </G>
    <Path
      id="question_mark_FILL0_wght100_GRAD0_opsz24"
      d="M313.78-798.54a2.3,2.3,0,0,1,.208-1,3.353,3.353,0,0,1,.849-1,3.182,3.182,0,0,0,.623-.742,1.6,1.6,0,0,0,.208-.813,1.5,1.5,0,0,0-.469-1.128,1.763,1.763,0,0,0-1.276-.451,1.727,1.727,0,0,0-1,.261,2.075,2.075,0,0,0-.629.7l-.3-.154a2.365,2.365,0,0,1,.783-.849,2.1,2.1,0,0,1,1.139-.291,2.005,2.005,0,0,1,1.537.576,1.892,1.892,0,0,1,.54,1.335,2.032,2.032,0,0,1-.22.932,2.515,2.515,0,0,1-.623.777,3.438,3.438,0,0,0-.861.967,2,2,0,0,0-.184.872Zm.142,2.516a.319.319,0,0,1-.231-.1.319.319,0,0,1-.1-.232.318.318,0,0,1,.1-.231.318.318,0,0,1,.231-.1.318.318,0,0,1,.231.1.318.318,0,0,1,.1.231.319.319,0,0,1-.1.232A.319.319,0,0,1,313.923-796.024Z"
      transform="translate(-304.421 817.315)"
      fill={colors.text ? colors.text : '#fff'}
      stroke={colors.text ? colors.text : '#fff'}
      strokeWidth={0.4}
    />
  </Svg>
)};
export default SVGComponent;
