import * as React from "react";
import Svg, { Defs,SvgProps ,ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    id="Group_1087"
    data-name="Group 1087"
    width={props.width}
    height={props.height}
    viewBox="0 0 18 18"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_3584"
          data-name="Rectangle 3584"
          width={18}
          height={18}
          fill={colors.text ? colors.text : '#fff'}
          stroke={colors.text ? colors.text : '#fff'}
          strokeWidth={0.2}
        />
      </ClipPath>
    </Defs>
    <G id="Group_1086" data-name="Group 1086" clipPath="url(#clip-path)">
      <Path
        id="Path_1876"
        data-name="Path 1876"
        d="M1.152,16.846H2.389L13.79,5.441,12.553,4.2,1.152,15.609v1.237m15.1-12.234L13.375,1.744,14.767.352a1.179,1.179,0,0,1,1.682,0l1.192,1.193A1.165,1.165,0,0,1,18,2.379a1.118,1.118,0,0,1-.346.835l-1.4,1.4m-.829.836L2.881,18H0V15.117L12.546,2.566l2.881,2.882M13.16,4.812,12.553,4.2,13.79,5.441l-.629-.63"
        transform="translate(0 0.001)"
        fill={colors.text ? colors.text : '#fff'}
        stroke={colors.text ? colors.text : '#fff'}
        strokeWidth={0.2}
      />
    </G>
  </Svg>
)};
export default SVGComponent;
