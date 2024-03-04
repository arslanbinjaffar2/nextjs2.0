import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoCheckout = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={16.362}
    height={16.3}
    viewBox="0 0 16.362 16.3"
    {...props}
  >
    <Path
      id="logout_FILL0_wght100_GRAD0_opsz24_1_"
      data-name="logout_FILL0_wght100_GRAD0_opsz24 (1)"
      d="M173.558-772a1.514,1.514,0,0,1-1.117-.442,1.514,1.514,0,0,1-.442-1.117v-12.883a1.514,1.514,0,0,1,.442-1.117,1.514,1.514,0,0,1,1.117-.442h6.468v.727h-6.468a.794.794,0,0,0-.571.26.794.794,0,0,0-.26.571v12.883a.794.794,0,0,0,.26.571.794.794,0,0,0,.571.26h6.468V-772Zm11.221-4.779-.519-.52,2.338-2.338h-9.455v-.727H186.6L184.26-782.7l.519-.52L188-780Z"
      transform="translate(-171.85 788.15)"
       fill={colors.text ? colors.text : '#fff'}
      stroke={colors.text ? colors.text : '#fff'}
      strokeWidth={0.3}
    />
  </Svg>
)};

export default IcoCheckout;
