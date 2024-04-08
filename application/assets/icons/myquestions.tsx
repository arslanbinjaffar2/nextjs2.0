import * as React from "react";
import Svg, { Path,SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 22.2 22.2"
        {...props}
    >
        <Path
            id="help_FILL0_wght100_GRAD0_opsz24"
            d="M143.065-810.678a.789.789,0,0,0,.583-.239.8.8,0,0,0,.237-.585.789.789,0,0,0-.239-.583.8.8,0,0,0-.585-.237.789.789,0,0,0-.583.239.8.8,0,0,0-.237.585.789.789,0,0,0,.239.583A.8.8,0,0,0,143.065-810.678Zm-.508-3.983h.885a3.133,3.133,0,0,1,.332-1.249,5.931,5.931,0,0,1,1-1.217,8.539,8.539,0,0,0,1.249-1.5,2.786,2.786,0,0,0,.4-1.48,2.908,2.908,0,0,0-.977-2.281,3.361,3.361,0,0,0-2.311-.869,3.442,3.442,0,0,0-2.134.68,4.574,4.574,0,0,0-1.343,1.533l.885.379a3.672,3.672,0,0,1,.917-1.217,2.4,2.4,0,0,1,1.612-.49,2.3,2.3,0,0,1,1.881.711,2.408,2.408,0,0,1,.585,1.565,2.014,2.014,0,0,1-.348,1.17,6.629,6.629,0,0,1-.917,1.043,6.12,6.12,0,0,0-1.359,1.675A3.544,3.544,0,0,0,142.557-814.661Zm.448,8.661a10.724,10.724,0,0,1-4.29-.866,11.119,11.119,0,0,1-3.5-2.35,11.1,11.1,0,0,1-2.353-3.491,10.694,10.694,0,0,1-.867-4.288,10.724,10.724,0,0,1,.866-4.29,11.118,11.118,0,0,1,2.35-3.5,11.1,11.1,0,0,1,3.491-2.353,10.693,10.693,0,0,1,4.288-.867,10.724,10.724,0,0,1,4.29.866,11.117,11.117,0,0,1,3.5,2.35,11.1,11.1,0,0,1,2.353,3.491,10.694,10.694,0,0,1,.867,4.288,10.724,10.724,0,0,1-.866,4.29,11.119,11.119,0,0,1-2.35,3.5,11.1,11.1,0,0,1-3.491,2.353A10.694,10.694,0,0,1,143.005-806Zm-.005-.885a9.762,9.762,0,0,0,7.175-2.94,9.762,9.762,0,0,0,2.94-7.175,9.762,9.762,0,0,0-2.94-7.175,9.762,9.762,0,0,0-7.175-2.94,9.762,9.762,0,0,0-7.175,2.94,9.762,9.762,0,0,0-2.94,7.175,9.762,9.762,0,0,0,2.94,7.175A9.762,9.762,0,0,0,143-806.885ZM143-817Z"
            transform="translate(-131.9 828.1)"
            fill={props.color ? props.color : colors.text}
            stroke={props.color ? props.color : colors.text}
            strokeWidth={0.2}
        />
    </Svg>
)};
export default SVGComponent;
