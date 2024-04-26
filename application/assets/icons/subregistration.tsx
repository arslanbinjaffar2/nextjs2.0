import * as React from "react";
import Svg, {SvgProps, G, Path, Line, Circle } from "react-native-svg";
import UseEventService from '../../store/services/UseEventService'
import { getColorScheme } from 'application/styles/colors'
const SVGComponent = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 22.045 23.312"
    {...props}
  >
      <Path
        id="Union_30"
        data-name="Union 30"
        d="M10.514,20.377H2.2a2.206,2.206,0,0,1-2.2-2.2V2.2A2.206,2.206,0,0,1,2.2,0H13.537a2.2,2.2,0,0,1,1.689.791l4.962.807a2.2,2.2,0,0,1,1.831,2.517l-1.5,10.393-.218-.031a5.718,5.718,0,1,1-9.788,5.9Zm.078-2.782a4.917,4.917,0,1,0,4.918-4.917A4.923,4.923,0,0,0,10.592,17.6ZM.8,2.2V18.174a1.4,1.4,0,0,0,1.4,1.4h7.942a5.721,5.721,0,0,1,4.794-7.671V2.2a1.4,1.4,0,0,0-1.4-1.4H2.2A1.4,1.4,0,0,0,.8,2.2ZM19.81,13.828l1.418-9.834a1.4,1.4,0,0,0-1.165-1.606l-4.386-.713a2.2,2.2,0,0,1,.064.528v9.68A5.7,5.7,0,0,1,19.81,13.828Zm-6.829,4a.4.4,0,0,1,.566-.565l1.4,1.4,3.073-2.391a.4.4,0,1,1,.491.632l-3.631,2.824ZM2.975,14.967a.4.4,0,0,1,0-.8H9.132a.4.4,0,1,1,0,.8Zm0-4.121a.4.4,0,0,1,0-.8h10.3a.4.4,0,1,1,0,.8Zm0-4.122a.4.4,0,0,1,0-.8h10.3a.4.4,0,1,1,0,.8Z"
        fill={props.color ? props.color : colors.text}
      />
  </Svg>
  )};
export default SVGComponent;
