import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

const IcoMessage = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.62}
    height={15.62}
    viewBox="0 0 15.62 15.62"
    {...props}
  >
    <G id="chat-2" transform="translate(0.5 0.5)">
      <G id="Group_5" data-name="Group 5">
        <Path
          id="Path_7"
          data-name="Path 7"
          d="M7.31,0A7.318,7.318,0,0,0,0,7.31v6.853a.457.457,0,0,0,.457.457H7.31A7.31,7.31,0,0,0,7.31,0Zm.457,9.137H4.112a.457.457,0,1,1,0-.914H7.767a.457.457,0,1,1,0,.914ZM10.508,6.4h-6.4a.457.457,0,1,1,0-.914h6.4a.457.457,0,1,1,0,.914Z"
          fill="none"
          stroke="#fff"
          strokeWidth={1}
        />
      </G>
    </G>
  </Svg>
);

export default IcoMessage;
