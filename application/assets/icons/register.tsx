import * as React from "react";
import Svg, { Path,SvgProps,Defs,ClipPath,Rect,G } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode); 
return(

    <Svg
    id="Group_6024"
    data-name="Group 6024"
    width={props.width}
  height={props.height}
    viewBox="0 0 17 15.63"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_3582"
          data-name="Rectangle 3582"
          width={props.width}
  height={props.height}
  fill={props.color ? props.color : colors.text}
          stroke={props.color ? props.color : colors.text}
          strokeWidth={0.4}
        />
      </ClipPath>
    </Defs>
    <G id="Group_1060" data-name="Group 1060" clipPath="url(#clip-path)">
      <Path
        id="Path_1866"
        data-name="Path 1866"
        d="M62.936.982A3.334,3.334,0,0,0,60.565,0h0a3.359,3.359,0,0,0-3.352,3.336A3.361,3.361,0,0,0,60.56,6.69h0a3.357,3.357,0,0,0,3.355-3.346A3.312,3.312,0,0,0,62.936.982M60.565,6.223a2.888,2.888,0,0,1-2.887-2.878A2.888,2.888,0,0,1,60.562.466h0a2.879,2.879,0,1,1,0,5.757"
        transform="translate(-53.837 1.143)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.4}
      />
      <Path
        id="Path_1867"
        data-name="Path 1867"
        d="M62.936.982A3.334,3.334,0,0,0,60.565,0h0a3.359,3.359,0,0,0-3.352,3.336A3.361,3.361,0,0,0,60.56,6.69h0a3.357,3.357,0,0,0,3.355-3.346A3.312,3.312,0,0,0,62.936.982M60.565,6.223a2.888,2.888,0,0,1-2.887-2.878A2.888,2.888,0,0,1,60.562.466h0a2.879,2.879,0,1,1,0,5.757"
        transform="translate(-53.837 1.143)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.4}
      />
      <Path
        id="Path_1868"
        data-name="Path 1868"
        d="M7.663,207.763a.212.212,0,0,1-.168.208.274.274,0,0,1-.056.005.328.328,0,0,1-.088-.012,6.5,6.5,0,0,0-1.757-.252,5.825,5.825,0,0,0-.691.041,5.175,5.175,0,0,0-3.753,2.025A3.39,3.39,0,0,0,.463,211.8a.256.256,0,0,1-.167.265.24.24,0,0,1-.072.011.194.194,0,0,1-.17-.088A.385.385,0,0,1,0,211.8a3.977,3.977,0,0,1,1.3-2.894,5.784,5.784,0,0,1,3.243-1.569c.242-.038.5-.058.74-.079l.109-.009c.1-.008.192-.012.283-.012.066,0,.132,0,.195.007a7.208,7.208,0,0,1,1.632.286.216.216,0,0,1,.165.23"
        transform="translate(1.143 -198.02)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.4}
      />
      <Path
        id="Path_1869"
        data-name="Path 1869"
        d="M7.663,207.763a.212.212,0,0,1-.168.208.274.274,0,0,1-.056.005.328.328,0,0,1-.088-.012,6.5,6.5,0,0,0-1.757-.252,5.825,5.825,0,0,0-.691.041,5.175,5.175,0,0,0-3.753,2.025A3.39,3.39,0,0,0,.463,211.8a.256.256,0,0,1-.167.265.24.24,0,0,1-.072.011.194.194,0,0,1-.17-.088A.385.385,0,0,1,0,211.8a3.977,3.977,0,0,1,1.3-2.894,5.784,5.784,0,0,1,3.243-1.569c.242-.038.5-.058.74-.079l.109-.009c.1-.008.192-.012.283-.012.066,0,.132,0,.195.007a7.208,7.208,0,0,1,1.632.286.216.216,0,0,1,.165.23"
        transform="translate(1.143 -198.02)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.4}
      />
      <Path
        id="add_24dp_FILL0_wght200_GRAD0_opsz24"
        d="M242.567-716.966H240v-.467h2.567V-720h.467v2.567H245.6v.467h-2.567v2.567h-.467Z"
        transform="translate(-229.918 728.455)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.2}
      />
    </G>
  </Svg>
);
}
export default SVGComponent;
