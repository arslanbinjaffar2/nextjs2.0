import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoSendMore = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={16.486}
    height={12.322}
    viewBox="0 0 16.486 12.322"
    {...props}
  >
    <Path
      id="prompt_suggestion_FILL0_wght100_GRAD0_opsz24"
      d="M183.039-696.156l-.519-.494,4.078-3.974H175.766a3.7,3.7,0,0,1-2.662-1.065,3.5,3.5,0,0,1-1.1-2.623,3.5,3.5,0,0,1,1.1-2.623A3.7,3.7,0,0,1,175.766-708h.468v.727h-.468a2.991,2.991,0,0,0-2.143.857,2.8,2.8,0,0,0-.9,2.1,2.8,2.8,0,0,0,.9,2.1,2.992,2.992,0,0,0,2.143.857H186.6l-4.078-4,.519-.494L188-700.987Z"
      transform="translate(-171.8 708.2)"
      fill={colors.text ? colors.text : '#e3e3e3'}
      stroke={colors.text ? colors.text : '#e3e3e3'}
      strokeWidth={0.4}
    />
  </Svg>
)};

export default IcoSendMore;
