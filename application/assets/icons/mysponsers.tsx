import * as React from "react";
import Svg, { G, SvgProps,Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 18.728 25.666"
        {...props}
    >
        <G id="Group_897" data-name="Group 897" transform="translate(0.508 0.515)">
            <Path
                id="Path_86"
                data-name="Path 86"
                d="M-55.2,476.763a5.88,5.88,0,0,1,5.88-5.88"
                transform="translate(58.598 -467.74)"
                fill="none"
                stroke={props.color ? props.color : colors.text}
                strokeLinecap="square"
                strokeWidth={1}
            />
            <Path
                id="Icon_awesome-award"
                data-name="Icon awesome-award"
                d="M4.479,17.456c-.4-.418-.192-.3-1.159-.57a3.283,3.283,0,0,1-1.173-.641L.055,21.6a.766.766,0,0,0,.712,1.06l2.43-.1L4.869,24.4a.724.724,0,0,0,1.219-.239l2.4-6.143a3.241,3.241,0,0,1-1.629.461,3.276,3.276,0,0,1-2.38-1.029ZM17.656,21.6l-2.093-5.355a3.275,3.275,0,0,1-1.173.641c-.972.271-.759.153-1.159.57a3.205,3.205,0,0,1-4.01.568l2.4,6.143a.724.724,0,0,0,1.219.239l1.672-1.843,2.43.1A.766.766,0,0,0,17.656,21.6ZM12.13,16.366c.7-.749.785-.684,1.789-.969A1.919,1.919,0,0,0,15.233,14a3.126,3.126,0,0,1,1.2-2.2,2.058,2.058,0,0,0,.481-1.905,3.256,3.256,0,0,1,0-2.543,2.058,2.058,0,0,0-.481-1.905,3.127,3.127,0,0,1-1.2-2.2A1.919,1.919,0,0,0,13.92,1.849,2.871,2.871,0,0,1,11.846.577,1.784,1.784,0,0,0,10.053.067a2.746,2.746,0,0,1-2.394,0A1.783,1.783,0,0,0,5.865.577,2.869,2.869,0,0,1,3.792,1.849,1.919,1.919,0,0,0,2.479,3.244a3.125,3.125,0,0,1-1.2,2.2A2.056,2.056,0,0,0,.8,7.351a3.254,3.254,0,0,1,0,2.543A2.059,2.059,0,0,0,1.282,11.8a3.126,3.126,0,0,1,1.2,2.2A1.919,1.919,0,0,0,3.792,15.4c1.032.294,1.109.247,1.789.969a1.777,1.777,0,0,0,2.294.28,1.766,1.766,0,0,1,1.962,0A1.776,1.776,0,0,0,12.13,16.366Z"
                transform="translate(0 0.001)"
                fill="none"
                stroke={props.color ? props.color : colors.text}
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth={1}
            />
        </G>
    </Svg>
)};
export default SVGComponent;
