import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const SVGComponent = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return(
  <Svg
  width={props.width}
  height={props.height} 
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      id="block_24dp_E8EAED_FILL1_wght200_GRAD0_opsz24"
      d="M136.006-808a15.6,15.6,0,0,1-6.24-1.26,16.175,16.175,0,0,1-5.083-3.419,16.146,16.146,0,0,1-3.422-5.078A15.559,15.559,0,0,1,120-823.994a15.594,15.594,0,0,1,1.26-6.24,16.172,16.172,0,0,1,3.419-5.083,16.143,16.143,0,0,1,5.078-3.422A15.559,15.559,0,0,1,135.994-840a15.594,15.594,0,0,1,6.24,1.26,16.171,16.171,0,0,1,5.083,3.419,16.144,16.144,0,0,1,3.422,5.078A15.559,15.559,0,0,1,152-824.006a15.594,15.594,0,0,1-1.26,6.24,16.17,16.17,0,0,1-3.419,5.083,16.142,16.142,0,0,1-5.078,3.422A15.559,15.559,0,0,1,136.006-808ZM136-809.778a14.02,14.02,0,0,0,5.015-.915,14.133,14.133,0,0,0,4.38-2.655l-20.048-20.048a14.77,14.77,0,0,0-2.638,4.38,13.793,13.793,0,0,0-.932,5.015,13.726,13.726,0,0,0,4.133,10.089A13.726,13.726,0,0,0,136-809.778Zm10.653-4.828a14.132,14.132,0,0,0,2.655-4.38,14.019,14.019,0,0,0,.915-5.015,13.726,13.726,0,0,0-4.133-10.089A13.726,13.726,0,0,0,136-838.222a14.386,14.386,0,0,0-5.038.9,13.151,13.151,0,0,0-4.357,2.672Z"
      transform="translate(-120 840)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
);
}
export default SVGComponent;
