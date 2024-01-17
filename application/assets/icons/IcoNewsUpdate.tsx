import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoNewsUpdate = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 64 50.561"
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_130"
          data-name="Rectangle 130"
          width={props.width}
          height={props.height}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G id="Group_677" data-name="Group 677" transform="translate(0 0)">
      <G
        id="Group_676"
        data-name="Group 676"
        transform="translate(0 0)"
        
      >
        <Path
          id="Path_1622"
          data-name="Path 1622"
          d="M62.467.722A3.747,3.747,0,0,0,59.115.176L10.42,15.533H3.742A3.748,3.748,0,0,0,0,19.3V31.176a3.726,3.726,0,0,0,3.742,3.742H10.42l2.91.909a9.508,9.508,0,0,0,7.12,10.784,10.5,10.5,0,0,0,2.6.338A8.991,8.991,0,0,0,31.1,41.492l28.011,8.887a3.616,3.616,0,0,0,1.143.182,3.808,3.808,0,0,0,2.209-.728A3.766,3.766,0,0,0,64,46.819V3.736A3.73,3.73,0,0,0,62.467.722M21.048,44.09a6.9,6.9,0,0,1-5.223-7.458l12.732,4.054a6.257,6.257,0,0,1-7.51,3.4M61.4,46.819a1.132,1.132,0,0,1-.468.909,1.15,1.15,0,0,1-1.039.182L11.017,32.4l-7.276-.078A1.137,1.137,0,0,1,2.6,31.176V19.3a1.159,1.159,0,0,1,1.143-1.169h6.886L59.894,2.645a1.15,1.15,0,0,1,1.039.182,1.132,1.132,0,0,1,.468.909Z"
          transform="translate(0 0.001)"
          fill={colors.text ? colors.text : '#fff'}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoNewsUpdate;
