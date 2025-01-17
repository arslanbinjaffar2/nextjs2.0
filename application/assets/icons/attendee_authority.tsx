import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const attendee_authority = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 64.074 61.404"
    >
        <G id="Group_688" data-name="Group 688" transform="translate(-669.5 -751)">
            <G id="Group_686" data-name="Group 686" transform="translate(669.5 751)">
                <Path
                    id="Path_1670"
                    data-name="Path 1670"
                    d="M11.179,275.367H5.839A5.345,5.345,0,0,1,.5,270.028V251.339A5.345,5.345,0,0,1,5.839,246h5.339a5.345,5.345,0,0,1,5.339,5.339v18.688a5.345,5.345,0,0,1-5.339,5.339m-5.339-26.7a2.672,2.672,0,0,0-2.67,2.67v18.688a2.672,2.672,0,0,0,2.67,2.67h5.339a2.672,2.672,0,0,0,2.67-2.67V251.339a2.672,2.672,0,0,0-2.67-2.67Z"
                    transform="translate(-0.5 -213.963)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1671"
                    data-name="Path 1671"
                    d="M20.179,295.4H14.839A5.345,5.345,0,0,1,9.5,290.064V239.339A5.345,5.345,0,0,1,14.839,234h5.339a5.345,5.345,0,0,1,5.339,5.339v50.725a5.345,5.345,0,0,1-5.339,5.339M14.839,236.67a2.672,2.672,0,0,0-2.67,2.67v50.725a2.672,2.672,0,0,0,2.67,2.67h5.339a2.672,2.672,0,0,0,2.67-2.67V239.339a2.672,2.672,0,0,0-2.67-2.67Z"
                    transform="translate(14.528 -234)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1672"
                    data-name="Path 1672"
                    d="M29.179,285.385H23.839a5.345,5.345,0,0,1-5.339-5.339V245.339A5.345,5.345,0,0,1,23.839,240h5.339a5.345,5.345,0,0,1,5.339,5.339v34.706a5.345,5.345,0,0,1-5.339,5.339M23.839,242.67a2.672,2.672,0,0,0-2.67,2.67v34.706a2.672,2.672,0,0,0,2.67,2.67h5.339a2.672,2.672,0,0,0,2.67-2.67V245.339a2.672,2.672,0,0,0-2.67-2.67Z"
                    transform="translate(29.555 -223.982)"
                    fill={props.color ? props.color : colors.text}
                />
            </G>
        </G>
    </Svg>
)};

export default attendee_authority;
