import * as React from 'react';
import Svg, { SvgProps,Defs, ClipPath, Rect, G, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const notes = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 13.743 19.459"
    {...props}
  >
    <Path
      id="Union_26"
      data-name="Union 26"
      d="M-912.544-9022.542a1.765,1.765,0,0,1-1.28-.5,1.929,1.929,0,0,1-.513-1.4h-.354a1.307,1.307,0,0,1-1.309-1.308v-12.093a1.308,1.308,0,0,1,1.309-1.307H-914v-.919a1.915,1.915,0,0,1,.565-1.366,1.911,1.911,0,0,1,1.364-.565,1.932,1.932,0,0,1,1.929,1.932v.919h4.6a1.3,1.3,0,0,1,1.264.972h.222a1.807,1.807,0,0,1,1.795,1.813v12.014a1.805,1.805,0,0,1-1.795,1.811Zm-.565-1.205a.781.781,0,0,0,.565.209h8.492a.807.807,0,0,0,.794-.814v-12.014a.8.8,0,0,0-.794-.812h-.179v11.428a1.3,1.3,0,0,1-1.307,1.308h-7.8A1,1,0,0,0-913.109-9023.747Zm-1.89-14.1v12.093a.31.31,0,0,0,.309.31h9.152a.308.308,0,0,0,.309-.31v-12.093a.307.307,0,0,0-.309-.306h-4.6v.192a1.453,1.453,0,0,1-1.452,1.452,1.444,1.444,0,0,1-1.028-.424,1.443,1.443,0,0,1-.424-1.028v-.192h-1.647A.308.308,0,0,0-915-9037.844Zm2.955-.113a.455.455,0,0,0,.134.322.458.458,0,0,0,.32.132.455.455,0,0,0,.454-.454v-.027a.493.493,0,0,1-.1.144.51.51,0,0,1-.354.146.5.5,0,0,1-.454-.289Zm-.681-2.771a.925.925,0,0,0-.272.658v.029a.987.987,0,0,1,.241-.395.968.968,0,0,1,.692-.286.979.979,0,0,1,.928.672v-.021a.932.932,0,0,0-.93-.931A.933.933,0,0,0-912.726-9040.728Zm-.538,12.642a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h3.374a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5Zm0-2.611a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h3.715a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5Zm2.144-1.606a.5.5,0,0,1-.127-.483l.37-1.355a.448.448,0,0,1,.129-.222l3.327-3.329a1.187,1.187,0,0,1,.849-.352,1.176,1.176,0,0,1,.844.352,1.2,1.2,0,0,1,0,1.692l-3.327,3.327a.505.505,0,0,1-.222.132l-1.357.369a.489.489,0,0,1-.129.017A.5.5,0,0,1-911.119-9032.3Zm4.4-4.682-3.234,3.231-.1.386.381-.106,3.236-3.234a.2.2,0,0,0,0-.276.192.192,0,0,0-.138-.06A.2.2,0,0,0-906.715-9036.985Z"
      transform="translate(916 9042.001)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
)};

export default notes;
