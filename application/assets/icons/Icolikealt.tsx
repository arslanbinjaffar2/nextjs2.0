import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icolikealt = (props: SvgProps) => {

  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);

  return (
  <Svg
    id="Group_642"
    data-name="Group 642"
    
    width={11.799}
    height={10.62}
    viewBox="0 0 11.799 10.62"
    {...props}
  >
    <Path
      id="Path_5"
      data-name="Path 5"
      d="M23.472,8.108a1.017,1.017,0,0,0-1.94.271,3.947,3.947,0,0,1-.389,1.543,1.827,1.827,0,0,1-1.156.665,4.706,4.706,0,0,0-1.767.85v6.331a6.29,6.29,0,0,0,1.881.349h3.275a1.438,1.438,0,0,0,1.437-1.437.581.581,0,0,0-.033-.191,1.239,1.239,0,0,0,.816-1.163.767.767,0,0,0-.186-.507,1.258,1.258,0,0,0,.6-1.074.8.8,0,0,0-.057-.293,1.038,1.038,0,0,0,.944-.934,1.021,1.021,0,0,0-.295-.791,1.007,1.007,0,0,0-.715-.3H22.993a7.2,7.2,0,0,0,.623-2.062A2.461,2.461,0,0,0,23.472,8.108Z"
      transform="translate(-15.1 -7.498)"
      fill={colors.text ? colors.text : "#fff"}
    />
    <Path
      id="Path_6"
      data-name="Path 6"
      d="M5.235,29.313H7.411a.234.234,0,0,0,.236-.236v-6.69a.235.235,0,0,0-.236-.236H5.235A.237.237,0,0,0,5,22.388v6.69A.235.235,0,0,0,5.235,29.313Z"
      transform="translate(-4.999 -18.694)"
      fill={colors.text ? colors.text : "#fff"}
    />
  </Svg>
)};

export default Icolikealt;
