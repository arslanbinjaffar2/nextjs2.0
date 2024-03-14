import * as React from "react";
import Svg, { Defs, SvgProps, ClipPath, Rect, G, Path } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
    <Svg
        id="Group_5633"
        width={props.width}
        height={props.height}
        viewBox="0 0 18 21.979"
        {...props}
    >
        <Defs>
            <ClipPath id="clip-path">
                <Rect
                    id="Rectangle_4120"
                    data-name="Rectangle 4120"
                    width={18}
                    height={21.979}
                    transform="translate(0 0)"
                    fill="none"
                />
            </ClipPath>
        </Defs>
        <G id="Group_5634" data-name="Group 5634" clipPath="url(#clip-path)">
            <Path
                id="Path_2358"
                data-name="Path 2358"
                d="M5.438,12.945l3.024,3.421a.749.749,0,0,0,.552.253h.01a.751.751,0,0,0,.549-.238l3.188-3.421a.75.75,0,1,0-1.1-1.023L9.717,14.026V.75a.75.75,0,0,0-1.5,0V13.824L6.562,11.952a.75.75,0,1,0-1.124.993"
                fill="#cfd1d5"
            />
            <Path
                id="Path_2359"
                data-name="Path 2359"
                d="M15.25,4.979H13.63a.75.75,0,1,0,0,1.5h1.62a1.25,1.25,0,0,1,1.25,1.25v11.5a1.25,1.25,0,0,1-1.25,1.25H2.75a1.25,1.25,0,0,1-1.25-1.25V7.729a1.25,1.25,0,0,1,1.25-1.25H4.98a.75.75,0,0,0,0-1.5H2.75A2.75,2.75,0,0,0,0,7.729v11.5a2.75,2.75,0,0,0,2.75,2.75h12.5A2.75,2.75,0,0,0,18,19.229V7.729a2.75,2.75,0,0,0-2.75-2.75"
                fill="#cfd1d5"
            />
        </G>
    </Svg>
);
export default SVGComponent;
