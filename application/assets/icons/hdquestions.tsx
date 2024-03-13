import * as React from "react";
import Svg, { SvgProps,G, Rect, Ellipse, Path, Line } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
    <Svg
        id="_1"
        data-name={1}
        width={props.width}
        height={props.height}
        viewBox="0 0 19.533 24"
        {...props}
    >
        <G id="Group_40" data-name="Group 40">
            <G
                id="Rectangle_70"
                data-name="Rectangle 70"
                transform="translate(0 10.815)"
                fill="none"
                stroke="#fff"
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
                stroke="#fff"
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
                stroke="#fff"
                strokeWidth={0.8}
            />
            <Line
                id="Line_37"
                data-name="Line 37"
                y1={2.322}
                x2={0.999}
                transform="translate(6.517 8.558)"
                fill="none"
                stroke="#fff"
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
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth={0.8}
            />
        </G>
    </Svg>
);
export default SVGComponent;
