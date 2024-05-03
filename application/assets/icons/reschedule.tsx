import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";
import { getColorScheme } from "application/styles/colors";
import UseEventService from "application/store/services/UseEventService";

const SVGComponent = (props) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 24.98 24.53"
    {...props}
  >
    <path
      id="Union_80"
      data-name="Union 80"
      d="M17.892,24.129a5.134,5.134,0,0,1-2.723-2.723,5.169,5.169,0,0,1,0-3.994,5.142,5.142,0,0,1,2.723-2.723,5.116,5.116,0,0,1,4.1.055,5.319,5.319,0,0,1,1.565,1.087V14.48h.828v2.807H21.576V16.46H23a4.792,4.792,0,0,0-1.323-.943,4.087,4.087,0,0,0-1.788-.4A4.268,4.268,0,0,0,15.6,19.409a4.287,4.287,0,0,0,7.1,3.246,4.317,4.317,0,0,0,1.443-2.634l.014-.084h.833l-.014.112a4.911,4.911,0,0,1-1.678,3.208,5.172,5.172,0,0,1-5.4.872Zm-14.94.3A2.957,2.957,0,0,1,0,21.475V5.4A2.957,2.957,0,0,1,2.952,2.444H8.476V.5a.5.5,0,0,1,1,0V2.444h5.776V.5a.5.5,0,1,1,1,0V2.444h4.53A2.957,2.957,0,0,1,23.735,5.4v7.82h-1V5.4a1.956,1.956,0,0,0-1.952-1.956h-4.53V5.017a.5.5,0,1,1-1,0V3.444H9.477V5.017a.5.5,0,1,1-1,0V3.444H2.952A1.956,1.956,0,0,0,1,5.4V21.475a1.956,1.956,0,0,0,1.952,1.956H15.134v1Zm16.523-4.85V16.17H20.3v3.066l2.146,2.147-.585.585ZM4.653,8.473a.5.5,0,0,1,0-1H19.518a.5.5,0,0,1,0,1Z"
      fill={props.color ? props.color : colors.text}
    />
  </svg>
  )
}
 
  
export default SVGComponent;
