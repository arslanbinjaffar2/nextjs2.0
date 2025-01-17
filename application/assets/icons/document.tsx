import * as React from "react";
import Svg, {SvgProps, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
     const { event } = UseEventService()
     const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 14.923 18.549"
        {...props}
    >
        <Path
            id="Union_3"
            data-name="Union 3"
            d="M1.448,18.3A1.445,1.445,0,0,1,0,16.859V7.985a1.562,1.562,0,0,1,1.154-1.5V.283A.284.284,0,0,1,1.439,0H12.551a.284.284,0,0,1,.285.283V.94h.714a.284.284,0,0,1,.285.283v7.64a1.559,1.559,0,0,1,.839,1.379v.9s0,0,0,0v.941s0,0,0,0v4.766a1.445,1.445,0,0,1-1.448,1.44ZM.569,7.985v8.874a.877.877,0,0,0,.878.873H13.225a.877.877,0,0,0,.878-.873V12.122s0,0,0,0v-.964s0,0,0,0v-.907a1,1,0,0,0-1-.992H7.4a1.558,1.558,0,0,1-1.458-.989l-.253-.64a.992.992,0,0,0-.928-.629H1.567A1,1,0,0,0,.569,7.985Zm12.266.7h.271a1.588,1.588,0,0,1,.159.008V1.507h-.429ZM1.723,6.427H4.76a1.558,1.558,0,0,1,1.458.989l.253.64a.992.992,0,0,0,.928.629h4.866V.566H1.723Zm5.4,1.586a.283.283,0,1,1,0-.566h3.952a.283.283,0,1,1,0,.566ZM9.048,6.627a.283.283,0,1,1,0-.566h2.028a.283.283,0,1,1,0,.566Zm-1.924,0a.283.283,0,1,1,0-.566H8.1a.283.283,0,1,1,0,.566ZM5.216,5.519a.95.95,0,0,0-1.9,0,.285.285,0,0,1-.569,0A1.508,1.508,0,0,1,3.382,4.29a1.52,1.52,0,1,1,1.768,0,1.508,1.508,0,0,1,.636,1.228.285.285,0,0,1-.569,0Zm-1.9-2.457a.95.95,0,1,0,.95-.945A.949.949,0,0,0,3.315,3.062ZM7.124,5.24a.283.283,0,1,1,0-.566h3.952a.283.283,0,1,1,0,.566Zm0-1.386a.283.283,0,1,1,0-.566h3.952a.283.283,0,1,1,0,.566Zm3.348-1.386-.032,0-.043,0H7.217c-.208,0-.377-.127-.377-.283s.169-.283.377-.283H10.4l.043,0,.032,0h.6a.283.283,0,1,1,0,.566Z"
            transform="translate(0.125 0.125)"
            fill={props.color ? props.color : colors.text}
            stroke={props.color ? props.color : colors.text}
            strokeWidth={0.25}
        />
    </Svg>
)};
export default SVGComponent;
