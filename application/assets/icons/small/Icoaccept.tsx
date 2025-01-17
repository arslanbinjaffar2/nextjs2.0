import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoaccept = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={18.483}
    height={18.4}
    viewBox="0 0 18.483 18.4"
    {...props}
  >
    <G
      id="Group_5689"
      data-name="Group 5689"
      transform="translate(-851.517 -306.454)"
    >
      <Path
        id="task_alt_FILL0_wght100_GRAD0_opsz24"
        d="M141-810a8.775,8.775,0,0,1-3.51-.708,9.1,9.1,0,0,1-2.86-1.923,9.084,9.084,0,0,1-1.925-2.856A8.751,8.751,0,0,1,132-819a8.77,8.77,0,0,1,.709-3.51,9.1,9.1,0,0,1,1.924-2.86,9.087,9.087,0,0,1,2.857-1.925A8.757,8.757,0,0,1,141-828a8.807,8.807,0,0,1,2.953.491,9.015,9.015,0,0,1,2.53,1.371l-.517.543a8.045,8.045,0,0,0-2.3-1.241,8.056,8.056,0,0,0-2.67-.44,7.978,7.978,0,0,0-5.858,2.418A7.978,7.978,0,0,0,132.724-819a7.978,7.978,0,0,0,2.418,5.858A7.978,7.978,0,0,0,141-810.724a7.978,7.978,0,0,0,5.858-2.418A7.978,7.978,0,0,0,149.276-819a8.24,8.24,0,0,0-.1-1.314,7.59,7.59,0,0,0-.31-1.247l.569-.595a8.675,8.675,0,0,1,.427,1.536A9.075,9.075,0,0,1,150-819a8.769,8.769,0,0,1-.708,3.51,9.09,9.09,0,0,1-1.923,2.857,9.084,9.084,0,0,1-2.856,1.924A8.755,8.755,0,0,1,141-810Zm-1.5-5.172-3.466-3.466.517-.517,2.948,2.948,9.983-9.983.517.517Z"
        transform="translate(719.717 1134.654)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="task_alt_FILL0_wght100_GRAD0_opsz24_-_Outline"
        data-name="task_alt_FILL0_wght100_GRAD0_opsz24 - Outline"
        d="M141-809.8a9.013,9.013,0,0,1-3.589-.725,9.338,9.338,0,0,1-2.922-1.965,9.325,9.325,0,0,1-1.967-2.918A8.99,8.99,0,0,1,131.8-819a9.009,9.009,0,0,1,.725-3.589,9.337,9.337,0,0,1,1.966-2.922,9.327,9.327,0,0,1,2.92-1.967A9,9,0,0,1,141-828.2a9.047,9.047,0,0,1,3.019.5,9.257,9.257,0,0,1,2.586,1.4l.175.136-.795.834-.143-.111a7.882,7.882,0,0,0-2.239-1.211,7.894,7.894,0,0,0-2.6-.428,7.819,7.819,0,0,0-5.716,2.359,7.819,7.819,0,0,0-2.36,5.716,7.819,7.819,0,0,0,2.36,5.716A7.819,7.819,0,0,0,141-810.924a7.819,7.819,0,0,0,5.716-2.359,7.819,7.819,0,0,0,2.36-5.716,8.079,8.079,0,0,0-.1-1.282,7.426,7.426,0,0,0-.3-1.214l-.039-.115.872-.912.112.3a8.919,8.919,0,0,1,.437,1.572A9.316,9.316,0,0,1,150.2-819a9.008,9.008,0,0,1-.725,3.589,9.332,9.332,0,0,1-1.965,2.92,9.326,9.326,0,0,1-2.918,1.966A8.993,8.993,0,0,1,141-809.8Zm0-18a8.6,8.6,0,0,0-3.431.693,8.93,8.93,0,0,0-2.8,1.883,8.939,8.939,0,0,0-1.882,2.8A8.612,8.612,0,0,0,132.2-819a8.593,8.593,0,0,0,.693,3.429,8.927,8.927,0,0,0,1.883,2.794,8.94,8.94,0,0,0,2.8,1.881A8.616,8.616,0,0,0,141-810.2a8.6,8.6,0,0,0,3.429-.692,8.928,8.928,0,0,0,2.794-1.882,8.933,8.933,0,0,0,1.881-2.8A8.61,8.61,0,0,0,149.8-819a8.918,8.918,0,0,0-.139-1.583,8.507,8.507,0,0,0-.309-1.2l-.262.274a7.842,7.842,0,0,1,.28,1.164,8.479,8.479,0,0,1,.106,1.346A8.206,8.206,0,0,1,147-813a8.206,8.206,0,0,1-6,2.477A8.206,8.206,0,0,1,135-813a8.206,8.206,0,0,1-2.477-6A8.206,8.206,0,0,1,135-825a8.206,8.206,0,0,1,6-2.477,8.292,8.292,0,0,1,2.735.451,8.3,8.3,0,0,1,2.208,1.163l.239-.251a8.887,8.887,0,0,0-2.3-1.207A8.648,8.648,0,0,0,141-827.8Zm-1.5,12.91-3.748-3.748.8-.8,2.948,2.948,9.983-9.983.8.8Zm-3.183-3.748,3.183,3.183,10.217-10.217-.234-.234-9.983,9.983-2.948-2.948Z"
        transform="translate(719.717 1134.654)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default Icoaccept;
