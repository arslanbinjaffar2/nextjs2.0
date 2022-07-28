import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SVGComponent = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 26.048 30.101"
  >
    <Path
      id="Path_1568"
      data-name="Path 1568"
      d="M12.719,0a9.288,9.288,0,0,1,9.29,9.29c0,4.987-.047,9.668,3.074,12.789a1.328,1.328,0,0,1-.938,2.265H17.3l.067.664a4.645,4.645,0,0,1-9.29,0l.067-.664H1.293a1.328,1.328,0,0,1-.938-2.265,9.733,9.733,0,0,0,2.634-4.754c.368-1.234.441-5.35.441-8.035A9.288,9.288,0,0,1,12.719,0Zm0,1.327A7.965,7.965,0,0,0,4.756,9.29c0,3.981.518,9.746-3.463,13.728H24.139c-3.981-3.981-3.463-9.746-3.463-13.728A7.957,7.957,0,0,0,12.719,1.327Zm3.25,23.018h-6.5l-.067.664a3.318,3.318,0,0,0,6.636,0Z"
      transform="translate(0.305 0.25)"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.5}
    />
  </Svg>
);

export default SVGComponent;
