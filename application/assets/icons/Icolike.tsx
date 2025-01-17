import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';


const IcoLike = (props: SvgProps) => {
  
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    id="Group_936"
    data-name="Group 936"
    width={props.width}
    height={props.height}
    viewBox="0 0 25.732 23.257"
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_3500"
          data-name="Rectangle 3500"
          width={25.732}
          height={23.257}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G id="Group_890" data-name="Group 890" >
      <Path
        id="Path_1634"
        data-name="Path 1634"
        d="M17.845,23.257H10.977a13.724,13.724,0,0,1-4.106-.76l-.335-.117V8.511l.194-.15a10.294,10.294,0,0,1,3.892-1.87,3.36,3.36,0,0,0,2.116-1.178,7.753,7.753,0,0,0,.742-2.987,2.659,2.659,0,0,1,1.557-2.1A2.631,2.631,0,0,1,18.5,1.578l.007.017a5.663,5.663,0,0,1,.331,2.9,15.529,15.529,0,0,1-1.032,3.749h5.3a2.627,2.627,0,0,1,2.613,2.813,2.684,2.684,0,0,1-1.871,2.311c.007.072.012.145.012.218a3.157,3.157,0,0,1-1.08,2.374,2.108,2.108,0,0,1,.215.949,3.1,3.1,0,0,1-1.646,2.726c0,.035,0,.07,0,.106a3.513,3.513,0,0,1-3.513,3.512M7.536,21.665a12.709,12.709,0,0,0,3.457.593h6.851a2.515,2.515,0,0,0,2.514-2.511.687.687,0,0,0-.039-.233l-.168-.469.469-.17A2.1,2.1,0,0,0,22,16.908a1.1,1.1,0,0,0-.269-.738l-.384-.445.5-.308a2.149,2.149,0,0,0,1.017-1.823,1.166,1.166,0,0,0-.084-.425l-.249-.626.671-.057a1.676,1.676,0,0,0,1.524-1.508,1.626,1.626,0,0,0-1.616-1.73H16.247l.341-.715A14.559,14.559,0,0,0,17.85,4.354a4.645,4.645,0,0,0-.268-2.384,1.631,1.631,0,0,0-2.145-.832,1.647,1.647,0,0,0-.963,1.277,8.623,8.623,0,0,1-.86,3.385l-.059.095a4.33,4.33,0,0,1-2.741,1.577A9.243,9.243,0,0,0,7.536,9.006Z"
        transform="translate(0 -0.001)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1635"
        data-name="Path 1635"
        d="M5.565,23.256H.992a.994.994,0,0,1-.992-1V8.241a1,1,0,0,1,.989-1H5.56a1,1,0,0,1,.995,1V22.261a1,1,0,0,1-.99,1M1,22.256H5.56L5.555,8.241.993,8.246Z"
        transform="translate(0 -0.001)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default IcoLike;
