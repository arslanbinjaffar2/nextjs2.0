import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';

const IcoSmiley = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    viewBox="0 0 21 21"
    {...props}
  >
    <G
      id="Group_987"
      data-name="Group 987"
      transform="translate(-940.769 -144)"
    >
      <Circle
        id="Ellipse_60"
        data-name="Ellipse 60"
        cx={10}
        cy={10}
        r={10}
        transform="translate(941.269 144.5)"
        fill="none"
        stroke="#fff"
        strokeWidth={1}
      />
      <G
        id="Group_956"
        data-name="Group 956"
        transform="translate(945.083 150.866)"
      >
        <Path
          id="Path_22"
          data-name="Path 22"
          d="M8.614,10.763a.638.638,0,0,1-.638-.638.85.85,0,1,0-1.7,0,.638.638,0,0,1-1.275,0,2.126,2.126,0,1,1,4.251,0A.638.638,0,0,1,8.614,10.763Z"
          transform="translate(-5 -8)"
          fill="#fff"
        />
        <Path
          id="Path_23"
          data-name="Path 23"
          d="M17.614,10.763a.638.638,0,0,1-.638-.638.85.85,0,1,0-1.7,0,.638.638,0,0,1-1.275,0,2.126,2.126,0,1,1,4.251,0A.638.638,0,0,1,17.614,10.763Z"
          transform="translate(-6.348 -8)"
          fill="#fff"
        />
        <Path
          id="Path_24"
          data-name="Path 24"
          d="M11.1,17.45a6.9,6.9,0,0,1-4.914-2.036.638.638,0,0,1,.9-.9,5.674,5.674,0,0,0,8.025,0,.638.638,0,1,1,.9.9A6.907,6.907,0,0,1,11.1,17.45Z"
          transform="translate(-5.15 -8.947)"
          fill="#fff"
        />
      </G>
    </G>
  </Svg>
);

export default IcoSmiley;
