import * as React from "react";
import Svg, { G, Rect,SvgProps ,Path, Line, Circle } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 23 24.5"
        {...props}
    >
        <G id="Group_1975" data-name="Group 1975" transform="translate(0.5 0.5)">
            <G
                id="Rectangle_70"
                data-name="Rectangle 70"
                transform="translate(2.827 12.692)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeWidth={1}
            >
                <Rect width={16.346} height={11.308} stroke="none" />
                <Rect x={0.5} y={0.5} width={15.346} height={10.308} fill="none" />
            </G>
            <Path
                id="Path_82"
                data-name="Path 82"
                d="M-355.716,194.17h3.216V171.5h-22v22.67h2.909"
                transform="translate(374.5 -171.5)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeWidth={1}
            />
            <Line
                id="Line_36"
                data-name="Line 36"
                x2={16.014}
                transform="translate(2.993 15.833)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeWidth={1}
            />
            <G
                id="Ellipse_3"
                data-name="Ellipse 3"
                transform="translate(8.838 0.998)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeWidth={1}
            >
                <Circle cx={2.162} cy={2.162} r={2.162} stroke="none" />
                <Circle cx={2.162} cy={2.162} r={1.662} fill="none" />
            </G>
            <Path
                id="Path_83"
                data-name="Path 83"
                d="M-173.5,195.415l1.654-4.7a1.654,1.654,0,0,1,1.521-1.215h4.479a1.641,1.641,0,0,1,1.5,1.144l1.888,4.772"
                transform="translate(178.821 -182.423)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeWidth={1}
            />
            <Line
                id="Line_37"
                data-name="Line 37"
                y1={2.319}
                x2={0.998}
                transform="translate(7.667 10.511)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeLinecap="round"
                strokeWidth={1}
            />
            <Line
                id="Line_38"
                data-name="Line 38"
                x2={0.998}
                y2={2.319}
                transform="translate(12.668 10.511)"
                fill="none"
                stroke={colors.text ? colors.text : '#fff'}
                strokeLinecap="round"
                strokeWidth={1}
            />
        </G>
    </Svg>
)};
export default SVGComponent;
