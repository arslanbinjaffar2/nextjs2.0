import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, {SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoLogin = (props: SvgProps) => {
  
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);  
  const fill = props.color ? props.color : colors.text;

  return (
    <Svg
      width={26.107}
      height={26.943}
      viewBox="0 0 26.107 26.943"

    >
      <G
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeWidth={1}
      >
        <G>
          <Path
            d="M0 5.705h16.267"
            transform="translate(-674.368 -273.5) translate(675.368 281)"
          />
          <Path
            d="M11.354 11.411l5.915-5.8L11.354.003"
            strokeLinejoin="round"
            transform="translate(-674.368 -273.5) translate(675.368 281)"
          />
        </G>
        <Path
          d="M682.207 278.542V274.5h17.268v24.943h-17.268v-4.7"
          strokeLinejoin="round"
          transform="translate(-674.368 -273.5)"
        />
      </G>
    </Svg>
  );
};

IcoLogin.defaultProps = {
  size: 24
};

IcoLogin.propTypes = {
  size: PropTypes.number
};

export default IcoLogin;