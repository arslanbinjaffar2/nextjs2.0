import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 18.241 18.2"
        {...props}
    >
        <Path
            id="logout_FILL0_wght100_GRAD0_opsz24"
            d="M173.753-770a1.7,1.7,0,0,1-1.257-.5,1.7,1.7,0,0,1-.5-1.256v-14.494a1.7,1.7,0,0,1,.5-1.256,1.7,1.7,0,0,1,1.257-.5h7.276v.818h-7.276a.894.894,0,0,0-.643.292.893.893,0,0,0-.292.643v14.494a.893.893,0,0,0,.292.643.894.894,0,0,0,.643.292h7.276V-770Zm12.623-5.377-.584-.584,2.63-2.63H177.786v-.818h10.636l-2.63-2.63.584-.584L190-779Z"
            transform="translate(-171.9 788.1)"
            fill="#fff"
            stroke="#fff"
            strokeWidth={0.2}
        />
    </Svg>
);
export default SVGComponent;
