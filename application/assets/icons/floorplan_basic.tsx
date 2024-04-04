import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Floorplan_Basic = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
        <Svg
            width={props.width}
            height={props.height}
            viewBox="0 0 61.532 63.966"
        >
            <G
                id="Group_698"
                data-name="Group 698"
                transform="translate(-997.841 -344.857)"
            >
                <Path
                    id="Path_1755"
                    data-name="Path 1755"
                    d="M12.4,18.253a5.85,5.85,0,1,1,5.85-5.85,5.857,5.857,0,0,1-5.85,5.85M12.4,8.1a4.3,4.3,0,1,0,4.3,4.3,4.307,4.307,0,0,0-4.3-4.3"
                    transform="translate(1016.205 345.978)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1733"
                    data-name="Path 1733"
                    d="M21.467,593.248c-.082,0-.163,0-.247-.01a2.744,2.744,0,0,1-1.876-.984C16.241,588.6,8,573.918,8,567.963a13.463,13.463,0,0,1,26.926,0c0,5.955-8.239,20.634-11.348,24.3a2.369,2.369,0,0,1-.343.343,2.748,2.748,0,0,1-1.769.643m0-36.277a11,11,0,0,0-10.992,10.992c0,5.14,7.831,19.243,10.762,22.7a.294.294,0,0,0,.42.042c2.973-3.5,10.8-17.6,10.8-22.745a11,11,0,0,0-10.992-10.992"
                    transform="translate(1007.142 -209.643)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1735"
                    data-name="Path 1735"
                    d="M3.787,605.425A2.788,2.788,0,0,1,1,602.633v-31a4.324,4.324,0,0,1,2.728-4.03l.047-.017,13.848-4.908a1.238,1.238,0,0,1,1.648,1.176S19,597.658,19,597.982a1.237,1.237,0,0,1-.724,1.122l-13.4,6.1a2.764,2.764,0,0,1-1.09.222m.84-35.523a1.863,1.863,0,0,0-1.157,1.727v31.006l.314.319,12.749-5.773c.035-4.367.2-25.334.252-31.586Z"
                    transform="translate(996.841 -197.721)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1737"
                    data-name="Path 1737"
                    d="M29.048,600.489a1.328,1.328,0,0,1-.39-.062l-18.633-6.212a1.239,1.239,0,0,1-.845-1.174V567.909a1.234,1.234,0,0,1,2.353-.524,91.445,91.445,0,0,0,5.7,10.29,3.625,3.625,0,0,0,5.1-.141c2.138-2.523,4.055-5,5.706-7.359a1.237,1.237,0,0,1,2.249.712v28.367a1.237,1.237,0,0,1-1.236,1.236m-17.4-8.338,16.161,5.39V574.665q-1.675,2.2-3.593,4.463a5.855,5.855,0,0,1-4.485,2.09l0,0a5.866,5.866,0,0,1-4.485-2.078q-1.942-3.006-3.6-6.059Z"
                    transform="translate(1008.875 -191.73)"
                    fill={props.color ? props.color : colors.text}
                />
                <Path
                    id="Path_1736"
                    data-name="Path 1736"
                    d="M19.853,606.86a1.237,1.237,0,0,1-1.236-1.236v-35.78a1.23,1.23,0,0,1,.724-1.125l13.4-6.1.042-.02a2.864,2.864,0,0,1,1.016-.212,2.8,2.8,0,0,1,2.817,2.792V597.3a4.323,4.323,0,0,1-2.728,4.033l-13.574,5.434a1.187,1.187,0,0,1-.46.089m1.236-36.22V603.8l11.879-4.757a1.865,1.865,0,0,0,1.176-1.74V565.179a.318.318,0,0,0-.316-.319l-.576-1.112.512,1.122Z"
                    transform="translate(1022.758 -198.037)"
                    fill={props.color ? props.color : colors.text}
                />
            </G>
        </Svg>
    )
};

export default Floorplan_Basic;
