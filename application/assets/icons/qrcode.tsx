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
  height={props.height}
  viewBox="0 0 20 20"
  {...props}
  >
    <Path
      id="qr_code_FILL0_wght200_GRAD0_opsz24"
      d="M160-791.25V-800h8.75v8.75Zm1.25-1.25h6.25v-6.25h-6.25ZM160-780v-8.75h8.75V-780Zm1.25-1.25h6.25v-6.25h-6.25Zm10-10V-800H180v8.75Zm1.25-1.25h6.25v-6.25H172.5Zm5.313,12.5v-2.187H180V-780Zm-6.562-6.562v-2.187h2.188v2.188Zm2.188,2.188v-2.187h2.188v2.188Zm-2.187,2.188v-2.187h2.188v2.188ZM173.438-780v-2.187h2.188V-780Zm2.188-2.187v-2.187h2.188v2.188Zm0-4.375v-2.187h2.188v2.188Zm2.188,2.188v-2.187H180v2.188Z"
      transform="translate(-160 800)"
      fill={props.color ? props.color : colors.text}
      />
  </Svg>
);
}
export default SVGComponent;
