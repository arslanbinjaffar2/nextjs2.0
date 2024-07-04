import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const alerts = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
        <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 20.316 25.937"
        {...props}
      >
        <Path
          id="Icon_ionic-md-hand"
          data-name="Icon ionic-md-hand"
          d="M22.88,18.127c-.527-1.37,1.157-2.632,2.011-1.79l2.645,3.03c.636.626,1.727,2.535,2.318,2.062.3-.345-.1-1.387-.181-2.062L27.536,8.492c-.109-.887.06-1.777.961-1.885s1.385,1,1.495,1.885l2.384,7.434c.071.194.256.672.273.411L32.8,4.7c.02-.911.29-1.339,1.2-1.339S35.261,3.8,35.261,4.7l.431,11.212c-.009.118.094.152.113.017L37.09,6.607a1.233,1.233,0,0,1,1.6-1.114c.893.159.963,1.466.9,2.283l-.253,8.562c0,.166.173.213.253,0l1.433-5.483c.3-.842.792-1.211,1.646-.912s.213,2.165,0,3.518l-1.237,7.175-1,5.288-.376,1.007c-.942,2.858-.278,1.948-.721,2.264-2.058,0-5.953.229-7.655,0l-.983-2.122-.066-.142a35.658,35.658,0,0,0-4.663-4.869A14.35,14.35,0,0,1,22.88,18.127Z"
          transform="translate(-22.78 -3.358)"
          fill={props.color ? props.color : colors.text}
        />
      </Svg>
)};

export default alerts;
