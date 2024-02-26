import * as React from 'react';
import Svg, { SvgProps, Path, G } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icowritecomment = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    id="noun_compose_344391"
    width={14.781}
    height={14.781}
    viewBox="0 0 14.781 14.781"
    {...props}
  >
    <G id="Group_71" data-name="Group 71">
      <Path
        id="Path_48"
        data-name="Path 48"
        d="M358.861,65.394l-1.17-1.17a.685.685,0,0,0-.966,0L355.5,65.448l2.136,2.136,1.224-1.22A.69.69,0,0,0,358.861,65.394Z"
        transform="translate(-344.279 -64.025)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <G id="Group_70" data-name="Group 70" transform="translate(3.696 1.789)">
        <Path
          id="Path_49"
          data-name="Path 49"
          d="M167.164,110.5l-6.621,6.833L160,119.8l2.464-.543,6.8-6.66Z"
          transform="translate(-160 -110.5)"
          fill={colors.text ? colors.text : '#fff'}
        />
      </G>
      <Path
        id="Path_50"
        data-name="Path 50"
        d="M76.319,102.159v5.774a.379.379,0,0,1-.354.389l-10.355,0a.4.4,0,0,1-.377-.385V97.617a.41.41,0,0,1,.408-.385h5.751L72.623,96H64.9a.894.894,0,0,0-.9.9V108.65a.9.9,0,0,0,.9.9H76.653a.9.9,0,0,0,.9-.9v-7.722Z"
        transform="translate(-64 -94.769)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default Icowritecomment;
