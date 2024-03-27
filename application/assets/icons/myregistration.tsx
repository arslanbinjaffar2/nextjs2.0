import * as React from 'react';
import Svg, { SvgProps, G, Path,Circle,Line } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const myregistration = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 23.94 23.412"
      {...props}
    >
      <G
        id="Group_902"
        data-name="Group 902"
        transform="translate(-17.512 -5.405)"
      >
        <G
          id="Rectangle_50"
          data-name="Rectangle 50"
          transform="translate(17.755 5.647)"
        >
          <Path
            id="Path_89"
            data-name="Path 89"
            d="M-55.939,476.092A2.061,2.061,0,0,1-58,474.031v-15.97A2.061,2.061,0,0,1-55.939,456h11.334a2.061,2.061,0,0,1,2.061,2.061"
            transform="translate(58 -456)"
            fill="none"
          />
          <Path
            id="Path_90"
            data-name="Path 90"
            d="M-47.308,476.077H-55.7a1.8,1.8,0,0,1-1.8-1.8V458.3a1.8,1.8,0,0,1,1.8-1.8h11.334a1.8,1.8,0,0,1,1.8,1.8v9.818"
            transform="translate(57.758 -456.242)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeWidth={1}
          />
        </G>
        <G
          id="Group_19"
          data-name="Group 19"
          transform="translate(20.588 11.829)"
        >
          <Line
            id="Line_22"
            data-name="Line 22"
            x2={10.304}
            transform="translate(0 0)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={1}
          />
          <Line
            id="Line_23"
            data-name="Line 23"
            x2={10.304}
            transform="translate(0 4.121)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeLinecap="round"
            strokeWidth={1}
          />
          <Line
            id="Line_24"
            data-name="Line 24"
            x2={6.157}
            transform="translate(0 8.243)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeLinecap="round"
            strokeWidth={1}
          />
        </G>
        <G
          id="Rectangle_50-2"
          data-name="Rectangle 50"
          transform="translate(23.873 6.677)"
        >
          <Path
            id="Path_41"
            data-name="Path 41"
            d="M-87,444h11.334a2.061,2.061,0,0,1,2.061,2.061v15.97a2.061,2.061,0,0,1-2.061,2.061"
            transform="translate(91.186 -442.97)"
            fill="none"
          />
          <Path
            id="Path_42"
            data-name="Path 42"
            d="M-33.062,468.372l5.042.82a1.8,1.8,0,0,1,1.5,2.063h0l-1.5,10.4"
            transform="translate(41.884 -468.372)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeWidth={1}
          />
          <Path
            id="Path_42-2"
            data-name="Path 42"
            d="M-43.844,505.2-49,503.874"
            transform="translate(49.003 -485.081)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeWidth={1}
          />
        </G>
        <G
          id="Group_55"
          data-name="Group 55"
          transform="translate(27.405 17.383)"
        >
          <Path
            id="Icon_awesome-heart"
            data-name="Icon awesome-heart"
            d="M5.382,2.6a1.592,1.592,0,0,0-2.173.158L2.98,3,2.75,2.763A1.592,1.592,0,0,0,.578,2.6a1.672,1.672,0,0,0-.115,2.42L2.715,7.351a.365.365,0,0,0,.527,0L5.5,5.025A1.671,1.671,0,0,0,5.382,2.6Z"
            transform="translate(2.643 0.94)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeWidth={1}
          />
          <G
            id="Ellipse_7"
            data-name="Ellipse 7"
            transform="translate(0)"
            fill="none"
            stroke={colors.text ? colors.text : '#fff'}
            strokeWidth={1}
          >
            <Circle cx={5.717} cy={5.717} r={5.717} stroke="none" />
            <Circle cx={5.717} cy={5.717} r={5.217} fill="none" />
          </G>
        </G>
      </G>
    </Svg>
)};

export default myregistration;
