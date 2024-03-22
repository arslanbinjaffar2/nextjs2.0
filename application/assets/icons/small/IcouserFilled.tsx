import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcouserFilled = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={17.309}
    height={17.309}
    viewBox="0 0 17.309 17.309"
    {...props}
  >
    <Path
      id="Icon_ionic-ios-contact"
      data-name="Icon ionic-ios-contact"
      d="M12.03,3.375h0a8.651,8.651,0,0,0-8.6,7.743,8.34,8.34,0,0,0,0,1.822,8.651,8.651,0,0,0,8.6,7.743h0a8.655,8.655,0,0,0,0-17.309Zm5.65,13.568c-.945-.358-2.476-.882-3.429-1.165-.1-.029-.112-.037-.112-.445a2.368,2.368,0,0,1,.275-.969,4.836,4.836,0,0,0,.383-1.315,2.923,2.923,0,0,0,.566-1.369,1.826,1.826,0,0,0-.017-1.148.737.737,0,0,1-.025-.071,7.482,7.482,0,0,1,.129-1.614,2.973,2.973,0,0,0-.62-2.135A3.18,3.18,0,0,0,12.4,5.547h-.728A3.176,3.176,0,0,0,9.254,6.712,2.96,2.96,0,0,0,8.63,8.846a7.482,7.482,0,0,1,.129,1.614c-.008.029-.017.05-.025.075a1.8,1.8,0,0,0-.017,1.148,2.969,2.969,0,0,0,.566,1.369,5.036,5.036,0,0,0,.383,1.315,2.324,2.324,0,0,1,.158.982c0,.412-.017.416-.108.445-.986.291-2.451.807-3.329,1.157A7.489,7.489,0,1,1,19.519,12.03,7.421,7.421,0,0,1,17.68,16.943Z"
      transform="translate(-3.375 -3.375)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default IcouserFilled;
