import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props:SvgProps) =>{
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
        <Svg
          width={props.width}
          height={props.width}
          viewBox="0 0 22.693 24.5"
          {...props}
        >
          <Path
            id="Union_110"
            data-name="Union 110"
            d="M4.373,24.241a1.449,1.449,0,0,1-.469-1.4l1.46-7.245L.413,10.7A1.471,1.471,0,0,1,.059,9.258,1.247,1.247,0,0,1,1.1,8.324l6.55-.671L10.238.825a1.158,1.158,0,0,1,2.219,0l2.59,6.829,6.55.671a1.245,1.245,0,0,1,1.038.934,1.471,1.471,0,0,1-.353,1.444L17.33,15.593l1.46,7.244a1.449,1.449,0,0,1-.469,1.4A1.092,1.092,0,0,1,17,24.3l-5.648-3.8L5.7,24.307a1.091,1.091,0,0,1-1.325-.067ZM17.3,22.649l-.008-.038-.423-.253ZM1.717,9.866l0,0L1.8,9.857Zm19.258,0h-.011Zm-5.88-2.083v0Z"
            transform="translate(0)"
            fill={props.color ? props.color : colors.text}
          />
        </Svg>
      );
}
export default SVGComponent;
