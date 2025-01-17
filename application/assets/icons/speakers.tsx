import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const speakers = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 44.018 64"
  >
    <G
      id="Group_670"
      data-name="Group 670"
      transform="translate(-245.99 -359.999)"
    >
      <Path
        id="Path_1604"
        data-name="Path 1604"
        d="M17.9,47.341A15.369,15.369,0,0,1,2.548,31.988V15.353a15.353,15.353,0,0,1,30.706,0V31.988A15.369,15.369,0,0,1,17.9,47.341m0-44.729A12.755,12.755,0,0,0,5.16,15.353V31.988a12.74,12.74,0,0,0,25.481,0V15.353A12.755,12.755,0,0,0,17.9,2.612"
        transform="translate(250.099 359.999)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1605"
        data-name="Path 1605"
        d="M.411,13.564a.6.6,0,0,1-.261-.183v-.313a.1.1,0,0,1,.026-.078,1.125,1.125,0,0,0,.235.575"
        transform="translate(246.232 380.942)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1606"
        data-name="Path 1606"
        d="M44.018,13.585a1.273,1.273,0,0,1-.34.862,1.977,1.977,0,0,1-.026.392v.026c-.34,12.383-10.319,18.365-20.141,18.887V41.59h9.222A1.31,1.31,0,0,1,34.039,42.9,1.327,1.327,0,0,1,32.733,44.2H11.677A1.327,1.327,0,0,1,10.371,42.9a1.31,1.31,0,0,1,1.306-1.306H20.9V33.753C10.867,33.335.549,27.274.392,14.526a.6.6,0,0,0,.261.183,1.125,1.125,0,0,1-.235-.575.1.1,0,0,0-.026.078v.313a1.106,1.106,0,0,1-.366-.758.036.036,0,0,1,0-.052A.236.236,0,0,1,0,13.585a1.31,1.31,0,0,1,1.306-1.306H3.4A1.31,1.31,0,0,1,4.7,13.585,1.293,1.293,0,0,1,3.4,14.891H3.03a1.712,1.712,0,0,0,0,.366C3.605,26.2,13.166,31.192,22.048,31.192S40.465,26.2,41.04,15.257a1.711,1.711,0,0,0,0-.366h-.418a1.293,1.293,0,0,1-1.306-1.306,1.31,1.31,0,0,1,1.306-1.306h2.09a1.31,1.31,0,0,1,1.306,1.306"
        transform="translate(245.99 379.797)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default speakers;
