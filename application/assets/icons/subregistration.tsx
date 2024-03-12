import * as React from "react";
import Svg, {SvgProps, G, Path, Line, Circle } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 22.065 23.312"
        {...props}
    >
        <G id="Group_902" data-name="Group 902" transform="translate(0.4 0.4)">
            <G id="Rectangle_50" data-name="Rectangle 50">
                <Path
                    id="Path_90"
                    data-name="Path 90"
                    d="M-47.308,476.077H-55.7a1.8,1.8,0,0,1-1.8-1.8V458.3a1.8,1.8,0,0,1,1.8-1.8h11.334a1.8,1.8,0,0,1,1.8,1.8v9.818"
                    transform="translate(57.5 -456.5)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={0.8}
                />
            </G>
            <G id="Group_19" data-name="Group 19" transform="translate(2.576 5.925)">
                <Line
                    id="Line_22"
                    data-name="Line 22"
                    x2={10.304}
                    transform="translate(0 0)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth={0.8}
                />
                <Line
                    id="Line_23"
                    data-name="Line 23"
                    x2={10.304}
                    transform="translate(0 4.121)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth={0.8}
                />
                <Line
                    id="Line_24"
                    data-name="Line 24"
                    x2={6.157}
                    transform="translate(0 8.243)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeWidth={0.8}
                />
            </G>
            <G
                id="Rectangle_50-2"
                data-name="Rectangle 50"
                transform="translate(14.683 0.773)"
            >
                <Path
                    id="Path_42"
                    data-name="Path 42"
                    d="M-33.062,468.372l5.042.82a1.8,1.8,0,0,1,1.5,2.063h0l-1.5,10.4"
                    transform="translate(33.062 -468.372)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={0.8}
                />
            </G>
            <G id="Group_55" data-name="Group 55" transform="translate(9.393 11.478)">
                <G
                    id="Ellipse_7"
                    data-name="Ellipse 7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={0.8}
                >
                    <Circle cx={5.717} cy={5.717} r={5.717} stroke="none" />
                    <Circle cx={5.717} cy={5.717} r={5.317} fill="none" />
                </G>
            </G>
        </G>
    </Svg>
);
export default SVGComponent;
