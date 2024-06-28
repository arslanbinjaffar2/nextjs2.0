import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icocalendar = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={14}
    height={14.833}
    viewBox="0 0 14 14.833"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_3824"
          data-name="Rectangle 3824"
          width={14}
          height={14.833}
          fill={colors.text ? colors.text : '#fff'}
        />
      </ClipPath>
    </Defs>
    <G id="Group_1788" data-name="Group 1788" >
      <Path
        id="Path_2139"
        data-name="Path 2139"
        d="M3.073,1.394c0-.282,0-.518,0-.753A.567.567,0,1,1,4.2.637c0,.243,0,.486,0,.743H9.789c0-.268-.008-.537,0-.805a.567.567,0,0,1,.434-.56.511.511,0,0,1,.587.246,1.046,1.046,0,0,1,.1.416c.017.208.007.418.011.627a.457.457,0,0,0,.032.09c.217,0,.45,0,.683,0A2.194,2.194,0,0,1,13.99,3.75c0,2.913-.022,5.826.01,8.739a2.284,2.284,0,0,1-2.351,2.344c-3.1-.036-6.208-.011-9.313-.012A2.184,2.184,0,0,1,0,12.483q0-4.37,0-8.739A2.2,2.2,0,0,1,2.332,1.395c.235,0,.47,0,.741,0m0,1.122h-.7A1.1,1.1,0,0,0,1.119,3.772q0,4.343,0,8.686a1.1,1.1,0,0,0,1.258,1.254h9.177c.924,0,1.316-.388,1.316-1.306q0-4.3,0-8.6a2.939,2.939,0,0,0-.016-.354,1.021,1.021,0,0,0-.879-.913,10.071,10.071,0,0,0-1.06-.007c0,.257,0,.5,0,.743a.567.567,0,1,1-1.125,0c0-.243,0-.487,0-.734H4.2c0,.259,0,.5,0,.732a.567.567,0,1,1-1.125,0c-.006-.243,0-.487,0-.758"
        transform="translate(0 0)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2140"
        data-name="Path 2140"
        d="M43.812,127.334a.84.84,0,0,1-.82.847.836.836,0,1,1-.019-1.671.835.835,0,0,1,.839.825"
        transform="translate(-39.058 -117.274)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2141"
        data-name="Path 2141"
        d="M127.358,126.509a.836.836,0,1,1-.85.814.845.845,0,0,1,.85-.814"
        transform="translate(-117.274 -117.274)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2142"
        data-name="Path 2142"
        d="M42.97,86.011a.834.834,0,1,1,0-1.668.834.834,0,1,1,0,1.668"
        transform="translate(-39.057 -78.187)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2143"
        data-name="Path 2143"
        d="M127.342,86.017a.834.834,0,0,1,0-1.667.834.834,0,1,1,0,1.667"
        transform="translate(-117.275 -78.192)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2144"
        data-name="Path 2144"
        d="M86.075,127.348a.833.833,0,1,1-.819-.84.826.826,0,0,1,.819.84"
        transform="translate(-78.248 -117.273)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_2145"
        data-name="Path 2145"
        d="M86.074,85.177a.833.833,0,1,1-.825-.835.823.823,0,0,1,.825.835"
        transform="translate(-78.247 -78.185)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default Icocalendar;
