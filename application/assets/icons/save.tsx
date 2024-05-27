import * as React from 'react';
import Svg, { SvgProps, Path,G } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) =>{
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    console.log(props.color)
    return(
 
        <Svg
        id="diskette"
        width={props.width}
        height={props.width}
        viewBox="0 0 20.036 20.036"
        {...props}
      >
        <G id="Group_626" data-name="Group 626">
          <G id="Group_625" data-name="Group 625">
            <Path
              id="Path_259"
              data-name="Path 259"
              d="M151.587,303.174h7.044a.587.587,0,1,0,0-1.174h-7.044a.587.587,0,1,0,0,1.174Z"
              transform="translate(-145.091 -290.182)"
              fill={props.color ? props.color : colors.text}
            />
            <Path
              id="Path_260"
              data-name="Path 260"
              d="M151.587,363.174h7.044a.587.587,0,1,0,0-1.174h-7.044a.587.587,0,1,0,0,1.174Z"
              transform="translate(-145.091 -347.834)"
              fill={props.color ? props.color : colors.text}
            />
            <Path
              id="Path_261"
              data-name="Path 261"
              d="M19.864,3.3,16.734.172A.587.587,0,0,0,16.319,0H.587A.587.587,0,0,0,0,.587V19.449a.587.587,0,0,0,.587.587H19.449a.587.587,0,0,0,.587-.587V3.718A.587.587,0,0,0,19.864,3.3ZM4.735,1.174h8.218V5.087H4.735ZM15.3,18.862H4.735V10.644H15.3Zm3.561,0H16.475V10.057a.587.587,0,0,0-.587-.587H4.148a.587.587,0,0,0-.587.587v8.805H1.174V1.174H3.561v4.5a.587.587,0,0,0,.587.587H13.54a.587.587,0,0,0,.587-.587v-4.5h1.948l2.787,2.787Z"
              transform="translate(0 0)"
              fill={props.color ? props.color : colors.text}
            />
            <Path
              id="Path_262"
              data-name="Path 262"
              d="M151.587,423.174h7.044a.587.587,0,1,0,0-1.174h-7.044a.587.587,0,1,0,0,1.174Z"
              transform="translate(-145.091 -405.486)"
              fill={props.color ? props.color : colors.text}
            />
          </G>
        </G>
      </Svg>
    );
}
export default SVGComponent;


