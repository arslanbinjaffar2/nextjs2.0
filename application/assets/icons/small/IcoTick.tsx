import * as React from 'react';
import Svg, { G, Circle, Polyline, SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoTick = (props: SvgProps) => {
  const [loaded, setloaded] = React.useState(false)
  const { event } = UseEventService();
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  console.log(colors.primary)
  React.useEffect(() => {
    setTimeout(() => {
      setloaded(true)
    }, 500);
  }, [])
  
  return (
<Svg
    width={74}
    height={74}
    id={loaded ? "active" : ""}
    viewBox="0 0 40 40"
    {...props}
  >
    <G fill="none" fillRule="evenodd">
      <Circle
        cx={20}
        cy={20}
        r={18}
        strokeWidth={4}
        id="svg-elem-1"
      />
      <Circle cx={20} cy={20} r={15}  id="svg-elem-2" />
      <Polyline
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={3}
        points="12 21 17.5 26.5 29 16"
        id="svg-elem-3"
      />
    </G>
  </Svg>
)};

export default IcoTick;
