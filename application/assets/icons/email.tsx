import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
    const SVGComponent = (props: SvgProps) => {
        const { event } = UseEventService()
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 20 15.402"
    {...props}
  >
    <Path
      id="mail_FILL0_wght100_GRAD0_opsz24"
      d="M133.724-732.6a1.675,1.675,0,0,1-1.236-.488,1.675,1.675,0,0,1-.489-1.236v-11.954a1.675,1.675,0,0,1,.489-1.236,1.675,1.675,0,0,1,1.236-.489h16.552a1.675,1.675,0,0,1,1.236.489,1.675,1.675,0,0,1,.489,1.236v11.954a1.675,1.675,0,0,1-.489,1.236,1.675,1.675,0,0,1-1.236.488ZM142-740.471l-9.2-6.092v12.241a.9.9,0,0,0,.259.661.9.9,0,0,0,.661.259h16.552a.9.9,0,0,0,.661-.259.9.9,0,0,0,.259-.661v-12.241Zm0-.977,8.736-5.747H133.264Zm-9.2-5.115v12.241a.9.9,0,0,0,.259.661.9.9,0,0,0,.661.259h-.92Z"
      transform="translate(-132 748)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
    }
export default SVGComponent;
