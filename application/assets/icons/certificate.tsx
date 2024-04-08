import * as React from "react";
import Svg, { SvgProps,G, Rect, Ellipse, Path, Line } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const certificate = (props:SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
      <Svg
    width={18.169}
    height={24}
    viewBox="0 0 18.169 24"
    {...props}
  >
    <Path
      id="workspace_premium_FILL0_wght100_GRAD0_opsz24"
      d="M218.373-814.644l1.017-3.39-2.678-1.9h3.356l1.017-3.458,1.017,3.458h3.356l-2.678,1.9,1.017,3.39-2.712-2.1ZM214.712-804v-8.475a8.577,8.577,0,0,1-2-2.881,8.939,8.939,0,0,1-.712-3.559,8.765,8.765,0,0,1,2.644-6.441A8.765,8.765,0,0,1,221.085-828a8.765,8.765,0,0,1,6.441,2.644,8.765,8.765,0,0,1,2.644,6.441,8.939,8.939,0,0,1-.712,3.559,8.577,8.577,0,0,1-2,2.881V-804l-6.373-1.83Zm6.373-6.78a7.845,7.845,0,0,0,5.763-2.373,7.846,7.846,0,0,0,2.373-5.763,7.845,7.845,0,0,0-2.373-5.763,7.846,7.846,0,0,0-5.763-2.373,7.846,7.846,0,0,0-5.763,2.373,7.846,7.846,0,0,0-2.373,5.763,7.846,7.846,0,0,0,2.373,5.763A7.846,7.846,0,0,0,221.085-810.78Zm-5.424,5.492,5.424-1.559,5.424,1.559v-6.373A8.409,8.409,0,0,1,224-810.305a8.955,8.955,0,0,1-2.915.475,8.955,8.955,0,0,1-2.915-.475,8.409,8.409,0,0,1-2.508-1.356ZM221.085-808.474Z"
      transform="translate(-212 828)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
)};
export default certificate;
