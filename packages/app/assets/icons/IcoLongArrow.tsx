import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path } from 'react-native-svg';

const IcoLongArrow = () => {
  const fill = '#ffffff';

  return (
    <Svg
      width={21.918}
      height={14.238}
      viewBox="0 0 21.918 14.238"
    >
      <G
        data-name="Group 104"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeWidth={2}
      >
        <Path
          data-name="Path 278"
          d="M784.295 473.143h19.856"
          transform="translate(-783.295 -466.129)"
        />
        <Path
          data-name="Path 279"
          d="M798.3 478.953l5.915-5.8-5.915-5.608"
          strokeLinejoin="round"
          transform="translate(-783.295 -466.129)"
        />
      </G>
    </Svg>
  );
};

IcoLongArrow.defaultProps = {
  size: 24
};

IcoLongArrow.propTypes = {
  // optional
  size: PropTypes.number
};

export default IcoLongArrow;