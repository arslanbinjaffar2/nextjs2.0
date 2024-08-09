import * as React from "react";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
import Svg, { Defs,SvgProps, ClipPath, Rect, G, Path } from "react-native-svg";
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    
    <Svg
        id="Group_1970"
        data-name="Group 1970"
        width={props.width}
        height={props.height}
        viewBox="0 0 24 21.945"
        {...props}
    >
        <Defs>
            <ClipPath id="clip-path">
                <Rect
                    id="Rectangle_3582"
                    data-name="Rectangle 3582"
                    width={24}
                    height={21.945}
                    fill={props.color ? props.color : colors.text}
                    stroke={props.color ? props.color : colors.text}
                    strokeWidth={0.4}
                />
            </ClipPath>
        </Defs>
        <G id="Group_1060" data-name="Group 1060" >
            <Path
                id="Path_1866"
                data-name="Path 1866"
                d="M65.8,1.473A5,5,0,0,0,62.243,0h-.006a5.039,5.039,0,0,0-5.028,5,5.041,5.041,0,0,0,5.026,5.031h.006a5.035,5.035,0,0,0,5.032-5.019A4.968,4.968,0,0,0,65.8,1.473M62.242,9.335a4.332,4.332,0,0,1-4.33-4.317A4.332,4.332,0,0,1,62.239.7h0a4.318,4.318,0,1,1,0,8.636"
                transform="translate(-52.15 1.714)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.4}
            />
            <Path
                id="Path_1867"
                data-name="Path 1867"
                d="M65.8,1.473A5,5,0,0,0,62.243,0h-.006a5.039,5.039,0,0,0-5.028,5,5.041,5.041,0,0,0,5.026,5.031h.006a5.035,5.035,0,0,0,5.032-5.019A4.968,4.968,0,0,0,65.8,1.473M62.242,9.335a4.332,4.332,0,0,1-4.33-4.317A4.332,4.332,0,0,1,62.239.7h0a4.318,4.318,0,1,1,0,8.636"
                transform="translate(-52.15 1.714)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.4}
            />
            <Path
                id="Path_1868"
                data-name="Path 1868"
                d="M11.495,208.024a.319.319,0,0,1-.252.312.411.411,0,0,1-.084.008.491.491,0,0,1-.132-.018,9.748,9.748,0,0,0-2.636-.378,8.737,8.737,0,0,0-1.036.062,7.762,7.762,0,0,0-5.63,3.038,5.086,5.086,0,0,0-1.031,3.036.384.384,0,0,1-.251.4.361.361,0,0,1-.109.017.291.291,0,0,1-.254-.132.578.578,0,0,1-.08-.282,5.965,5.965,0,0,1,1.945-4.34,8.675,8.675,0,0,1,4.865-2.353c.363-.057.743-.088,1.11-.118l.164-.013c.146-.012.288-.019.424-.019.1,0,.2,0,.292.01a10.814,10.814,0,0,1,2.448.429.324.324,0,0,1,.248.345"
                transform="translate(1.714 -193.41)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.4}
            />
            <Path
                id="Path_1869"
                data-name="Path 1869"
                d="M11.495,208.024a.319.319,0,0,1-.252.312.411.411,0,0,1-.084.008.491.491,0,0,1-.132-.018,9.748,9.748,0,0,0-2.636-.378,8.737,8.737,0,0,0-1.036.062,7.762,7.762,0,0,0-5.63,3.038,5.086,5.086,0,0,0-1.031,3.036.384.384,0,0,1-.251.4.361.361,0,0,1-.109.017.291.291,0,0,1-.254-.132.578.578,0,0,1-.08-.282,5.965,5.965,0,0,1,1.945-4.34,8.675,8.675,0,0,1,4.865-2.353c.363-.057.743-.088,1.11-.118l.164-.013c.146-.012.288-.019.424-.019.1,0,.2,0,.292.01a10.814,10.814,0,0,1,2.448.429.324.324,0,0,1,.248.345"
                transform="translate(1.714 -193.41)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.4}
            />
            <Path
                id="Path_1870"
                data-name="Path 1870"
                d="M187.047,145.663h.664l6.126-6.126-.664-.664L187.047,145Zm8.1-6.464-1.533-1.648.748-.748a.634.634,0,0,1,.9,0l.641.641a.625.625,0,0,1,.193.448.6.6,0,0,1-.186.448l-.85.859m-.25.275-6.839,6.809h-1.548v-1.548l6.742-6.742,1.645,1.544M193.5,139.2l-.326-.326.664.664Z"
                transform="translate(-173.814 -126.913)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.2}
            />
        </G>
    </Svg>
)};
export default SVGComponent;
