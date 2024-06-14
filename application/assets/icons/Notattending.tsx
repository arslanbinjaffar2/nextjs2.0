// eslint-disable-next-line quotes
import * as React from "react";
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const myturnlist = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
   
      <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 14.2 16.152"
      {...props}
    >
      <Path
        id="event_busy_24dp_FILL0_wght200_GRAD0_opsz24"
        d="M164.988-836.115l-.619-.619,2.012-2.013-2.012-2.013.619-.619L167-839.366l2.012-2.013.619.619-2.012,2.013,2.012,2.013-.619.619L167-838.128Zm-3.574,2.837a1.369,1.369,0,0,1-1.009-.4,1.369,1.369,0,0,1-.4-1.009v-11.173a1.369,1.369,0,0,1,.4-1.009,1.369,1.369,0,0,1,1.009-.4h1.548v-1.952h.942v1.952h6.26v-1.952h.875v1.952h1.548a1.369,1.369,0,0,1,1.009.4,1.369,1.369,0,0,1,.4,1.009v11.173a1.369,1.369,0,0,1-.4,1.009,1.369,1.369,0,0,1-1.009.4Zm0-.875h11.173a.515.515,0,0,0,.37-.168.515.515,0,0,0,.168-.37v-7.673h-12.25v7.673a.515.515,0,0,0,.168.37A.515.515,0,0,0,161.414-834.153Zm-.539-9.087h12.25v-2.625a.515.515,0,0,0-.168-.37.515.515,0,0,0-.37-.168H161.414a.515.515,0,0,0-.37.168.515.515,0,0,0-.168.37Zm0,0v0Z"
        transform="translate(-159.9 849.33)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.2}
      />
    </Svg>
)};

export default myturnlist;
