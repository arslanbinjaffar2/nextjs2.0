import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoInfo = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={19.491}
    height={19.491}
    viewBox="0 0 19.491 19.491"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4110"
          data-name="Rectangle 4110"
          width={5}
          height={12}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G
      id="Group_5557"
      data-name="Group 5557"
      transform="translate(-394.255 -463.086)"
    >
      <Path
        id="Path_1615"
        data-name="Path 1615"
        d="M9.745,19.491a9.745,9.745,0,1,1,9.745-9.745,9.756,9.756,0,0,1-9.745,9.745m0-18.679a8.933,8.933,0,1,0,8.933,8.933A8.944,8.944,0,0,0,9.745.812"
        transform="translate(394.255 463.086)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <G
        id="Group_5554"
        data-name="Group 5554"
        transform="translate(401.495 466.832)"
      >
        <G id="Group_5553" data-name="Group 5553" clipPath="url(#clip-path)">
          <Path
            id="Path_2343"
            data-name="Path 2343"
            d="M45.918,1.757a1.1,1.1,0,0,1-1.523.228,1.1,1.1,0,0,1,.019-1.54A1.1,1.1,0,0,1,45.937.217a1.1,1.1,0,0,1-.019,1.54"
            transform="translate(-41.234 0)"
            fill={colors.text ? colors.text : '#fff'}
          />
          <Path
            id="Path_2344"
            data-name="Path 2344"
            d="M2.066,47.536a.072.072,0,0,1,.1.086C1.9,48.539.513,53.312.649,54.178a.965.965,0,0,0,1.163.775s.645.053,2.816-1.98a.308.308,0,0,0,.1-.182c.013-.1-.024-.2-.287-.121-.438.136-1.737.761-1.737.761s-.215.09-.2-.111c.016-.181,1.382-5.474,1.657-6.537a.655.655,0,0,0-.19-.658.723.723,0,0,0-.389-.167c-.588-.08-1.668.11-3.515,2.027A.232.232,0,0,0,0,48.15c0,.061.032.126.144.142A.314.314,0,0,0,.3,48.272c.845-.323,1.49-.61,1.764-.735"
            transform="translate(0.001 -42.967)"
            fill={colors.text ? colors.text : '#fff'}
          />
        </G>
      </G>
    </G>
  </Svg>
)};

export default IcoInfo;
