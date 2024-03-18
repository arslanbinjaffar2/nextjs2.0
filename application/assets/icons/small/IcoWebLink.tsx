import * as React from 'react';
import Svg, { SvgProps, Path, Ellipse, G } from 'react-native-svg';


const IcoWebLink = (props: SvgProps) => {

return (
<Svg
    width={28.623}
    height={28.623}
    viewBox="0 0 28.623 28.623"
    {...props}
  >
    <G id="Group_5603" data-name="Group 5603" transform="translate(0 -1.636)">
      <Ellipse
        id="Ellipse_4"
        data-name="Ellipse 4"
        cx={14.312}
        cy={14.312}
        rx={14.312}
        ry={14.312}
        transform="translate(0 1.636)"
        fill="#eaeaea"
        opacity={0.436}
      />
      <G
        id="Icon_feather-globe"
        data-name="Icon feather-globe"
        transform="translate(7.322 9.146)"
      >
        <Path
          id="Path_1595"
          data-name="Path 1595"
          d="M17.546,10.273A7.273,7.273,0,1,1,10.273,3a7.273,7.273,0,0,1,7.273,7.273Z"
          transform="translate(-3 -3)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <Path
          id="Path_1596"
          data-name="Path 1596"
          d="M3,18H17.546"
          transform="translate(-3 -10.727)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <Path
          id="Path_1597"
          data-name="Path 1597"
          d="M14.909,3a11.128,11.128,0,0,1,2.909,7.273,11.128,11.128,0,0,1-2.909,7.273A11.128,11.128,0,0,1,12,10.273,11.128,11.128,0,0,1,14.909,3Z"
          transform="translate(-7.636 -3)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoWebLink;
