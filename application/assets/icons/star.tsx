import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) =>{
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    console.log(props.color)
    return(
        <Svg
        width={props.width}
        height={props.width}
        viewBox="0 0 16.347 17.649"
        {...props}
      >
        <Path
          id="star_1_"
          data-name="star (1)"
          d="M3.659,18.141a.8.8,0,0,1-.509-.187,1.045,1.045,0,0,1-.338-1.011l1.052-5.219L.3,8.2a1.06,1.06,0,0,1-.255-1.04A.9.9,0,0,1,.79,6.488l4.719-.483L7.375,1.087a.834.834,0,0,1,1.6,0l1.866,4.92,4.718.483a.9.9,0,0,1,.748.673,1.06,1.06,0,0,1-.254,1.04l-3.567,3.523,1.052,5.219a1.044,1.044,0,0,1-.338,1.011.787.787,0,0,1-.955.047L8.174,15.261,4.1,18A.8.8,0,0,1,3.659,18.141Zm4.515-4.06a.8.8,0,0,1,.446.139l3.84,2.588-.993-4.926a1.055,1.055,0,0,1,.275-.954L15.11,7.6l-4.455-.456a.884.884,0,0,1-.722-.593L8.174,1.909,6.413,6.552a.881.881,0,0,1-.72.591L1.237,7.6,4.6,10.926a1.053,1.053,0,0,1,.275.955l-.992,4.926,3.84-2.587A.8.8,0,0,1,8.174,14.081ZM5.473,6.1v0Zm5.4,0v0Zm0,0"
          transform="translate(0 -0.492)"
          fill={props.color ? props.color : colors.text}
        />
      </Svg>
    );
}
export default SVGComponent;
