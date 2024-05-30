import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icosendemail = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={20.2}
    height={15.602}
    viewBox="0 0 20.2 15.602"
    {...props}
  >
    <Path
      id="mail_FILL0_wght100_GRAD0_opsz24"
      d="M133.724-732.6a1.675,1.675,0,0,1-1.236-.489,1.674,1.674,0,0,1-.489-1.236v-11.954a1.675,1.675,0,0,1,.489-1.236,1.674,1.674,0,0,1,1.236-.488h16.552a1.674,1.674,0,0,1,1.236.488,1.675,1.675,0,0,1,.489,1.236v11.954a1.674,1.674,0,0,1-.489,1.236,1.675,1.675,0,0,1-1.236.489ZM142-740.471l-9.2-6.092v12.241a.9.9,0,0,0,.259.661.9.9,0,0,0,.661.259h16.552a.9.9,0,0,0,.661-.259.9.9,0,0,0,.259-.661v-12.241Zm0-.977,8.736-5.747H133.264Zm-9.2-5.115v12.241a.9.9,0,0,0,.259.661.9.9,0,0,0,.661.259h-.92Z"
      transform="translate(-131.9 748.1)"
      fill={props.color ? props.color : colors.text}
    />
    <Path
      id="mail_FILL0_wght100_GRAD0_opsz24_-_Outline"
      data-name="mail_FILL0_wght100_GRAD0_opsz24 - Outline"
      d="M150.276-732.5H133.724a1.778,1.778,0,0,1-1.306-.518,1.778,1.778,0,0,1-.518-1.306v-11.954a1.778,1.778,0,0,1,.518-1.306,1.778,1.778,0,0,1,1.306-.518h16.552a1.778,1.778,0,0,1,1.306.518,1.778,1.778,0,0,1,.518,1.306v11.954a1.778,1.778,0,0,1-.518,1.306A1.778,1.778,0,0,1,150.276-732.5Zm-16.552-15.4a1.565,1.565,0,0,0-1.165.459,1.585,1.585,0,0,0-.459,1.165v11.954a1.585,1.585,0,0,0,.459,1.165,1.585,1.585,0,0,0,1.165.459h16.552a1.585,1.585,0,0,0,1.165-.459,1.585,1.585,0,0,0,.459-1.165v-11.954a1.585,1.585,0,0,0-.459-1.165,1.565,1.565,0,0,0-1.165-.459Zm16.552,14.6H132.7V-747.2h.2v.578l9.1,6.026,9.3-6.158v12.428a1,1,0,0,1-.288.732A1,1,0,0,1,150.276-733.3Zm-16.552-.2h16.552a.792.792,0,0,0,.59-.229.792.792,0,0,0,.229-.59v-12.055l-9.1,6.026-.055-.037-9.04-5.989v12.055a.792.792,0,0,0,.229.59A.792.792,0,0,0,133.724-733.5ZM142-741.329l-.055-.036L132.93-747.3H151.07Zm-8.4-5.767,8.4,5.527,8.4-5.527Z"
      transform="translate(-131.9 748.1)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
)};

export default Icosendemail;
