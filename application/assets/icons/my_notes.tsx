import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const my_notes = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 45.564 64.024"
  >
    <G
      id="Group_694"
      data-name="Group 694"
      transform="translate(-1016.599 -196.854)"
    >
      <Path
        id="Path_1731"
        data-name="Path 1731"
        d="M21.114,525.569H8.713a1.363,1.363,0,1,1,0-2.726h12.4a1.363,1.363,0,1,1,0,2.726"
        transform="translate(1017.02 -291.938)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1732"
        data-name="Path 1732"
        d="M19.978,528.772H8.713a1.363,1.363,0,0,1,0-2.726H19.978a1.363,1.363,0,0,1,0,2.726"
        transform="translate(1017.02 -286.411)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1726"
        data-name="Path 1726"
        d="M14.569,527.418a4.214,4.214,0,0,1-4.208-4.2l.016-5.988a2.614,2.614,0,0,1,5.228,0l-.011,5.176a1.022,1.022,0,1,1-2.044-.005l.011-5.173c0-.624-1.139-.627-1.139,0l-.016,5.985a2.159,2.159,0,0,0,2.164,2.156h0a2.163,2.163,0,0,0,2.161-2.167v-7.059a3.75,3.75,0,1,0-7.5,0v3.505a1.022,1.022,0,0,1-2.044,0v-3.505a5.795,5.795,0,1,1,11.589,0V523.2a4.206,4.206,0,0,1-4.2,4.214Z"
        transform="translate(1016.74 -313.496)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1727"
        data-name="Path 1727"
        d="M11.556,533.539a1.024,1.024,0,0,1-.984-1.292l1.235-4.524a1.062,1.062,0,0,1,.262-.455l11.115-11.109.011-.014a3.28,3.28,0,0,1,2.388-.935,3.35,3.35,0,0,1,2.352,5.669L16.809,532.007a1.068,1.068,0,0,1-.455.265L11.826,533.5a1.014,1.014,0,0,1-.27.035m2.15-5.018-.692,2.54,2.54-.692,10.921-10.922a1.306,1.306,0,0,0-1.856-1.837Z"
        transform="translate(1022.516 -305.115)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1728"
        data-name="Path 1728"
        d="M12.178,566.513a5.587,5.587,0,0,1-5.541-5.4,5.415,5.415,0,0,1,.063-1.049l2.7.42a2.722,2.722,0,0,0-.035.534,2.86,2.86,0,0,0,.9,2,2.734,2.734,0,0,0,2.05.769H40.7a3,3,0,0,0,2.952-3.012V520.654a3,3,0,0,0-2.965-3.023h-1.4v-2.726H40.7a5.736,5.736,0,0,1,5.677,5.756v40.1a5.731,5.731,0,0,1-5.664,5.745H12.358c-.06,0-.12,0-.18,0"
        transform="translate(1015.782 -305.634)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1729"
        data-name="Path 1729"
        d="M8.868,516.33a1.643,1.643,0,0,0-1.644,1.641v40.38a1.643,1.643,0,0,0,1.644,1.641H39.425a1.642,1.642,0,0,0,1.638-1.641V517.97a1.642,1.642,0,0,0-1.638-1.641Zm0-2.726H39.425a4.365,4.365,0,0,1,4.364,4.366v40.38a4.365,4.365,0,0,1-4.364,4.366H8.868A4.366,4.366,0,0,1,4.5,558.35V517.97A4.366,4.366,0,0,1,8.868,513.6"
        transform="translate(1012.1 -307.881)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default my_notes;
