import * as React from "react";
import Svg, { Path,SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
        <Svg
        width={props.width}
        height={props.width}
          viewBox="0 0 14.197 17.261"
          {...props}
        >
          <Path
            id="Union_75"
            data-name="Union 75"
            d="M-11177.663-12557.294a7.289,7.289,0,0,1-2.259-1.521,7.215,7.215,0,0,1-1.521-2.26,6.945,6.945,0,0,1-.556-2.764,6.942,6.942,0,0,1,.556-2.762,7.226,7.226,0,0,1,1.521-2.26,7.236,7.236,0,0,1,2.259-1.521,6.942,6.942,0,0,1,2.762-.556,6.955,6.955,0,0,1,2.5.461,7.719,7.719,0,0,1,2.14,1.243l.962-.962.761.76-.963.963a7.749,7.749,0,0,1,1.244,2.137,6.974,6.974,0,0,1,.46,2.5,6.944,6.944,0,0,1-.555,2.764,7.265,7.265,0,0,1-1.521,2.26,7.282,7.282,0,0,1-2.26,1.521,6.937,6.937,0,0,1-2.764.555A6.931,6.931,0,0,1-11177.663-12557.294Zm-1.5-10.806a5.837,5.837,0,0,0-1.764,4.261,5.838,5.838,0,0,0,1.764,4.263,5.836,5.836,0,0,0,4.261,1.765,5.834,5.834,0,0,0,4.263-1.765,5.835,5.835,0,0,0,1.765-4.263,5.834,5.834,0,0,0-1.765-4.261,5.833,5.833,0,0,0-4.263-1.764A5.835,5.835,0,0,0-11179.162-12568.1Zm3.724,4.9v-4.778h1.076v4.778Zm-1.852-9.727V-12574h4.777v1.075Z"
            transform="translate(11181.999 12574)"
            fill={props.color ? props.color : colors.text}
          />
        </Svg>
      );
}
export default SVGComponent;
