import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icosettings = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 32.178 32.184"
  >
    <Defs>
      <ClipPath>
        <Rect
          id="Rectangle_165"
          data-name="Rectangle 165"
          width={32.178}
          height={32.184}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G id="Group_906" data-name="Group 906" transform="translate(0 0)">
      <G
        id="Group_905"
        data-name="Group 905"
        transform="translate(0 0)"
      >
        <Path
          id="Path_305"
          data-name="Path 305"
          d="M12.895,32.184a1.4,1.4,0,0,1-1.345-1.136l-.582-3.77a12.124,12.124,0,0,1-2.211-1.268L5.133,27.429a1.4,1.4,0,0,1-1.721-.569L.244,21.515a1.313,1.313,0,0,1-.21-.975,1.339,1.339,0,0,1,.549-.871L3.625,17.33c-.006-.142-.017-.281-.028-.418-.02-.268-.039-.535-.039-.822s.019-.554.039-.821c.011-.137.02-.274.028-.414L.489,12.5a1.594,1.594,0,0,1-.358-1.771l3.2-5.4a1.366,1.366,0,0,1,1.757-.565l3.6,1.407a13.91,13.91,0,0,1,2.2-1.268l.578-3.753A1.493,1.493,0,0,1,12.867,0H19.21a1.475,1.475,0,0,1,1.4,1.082l.523,3.823a12.1,12.1,0,0,1,2.2,1.269L26.96,4.757a1.4,1.4,0,0,1,1.722.57l3.165,5.34a1.3,1.3,0,0,1,.212.975,1.333,1.333,0,0,1-.549.871l-3.043,2.34c.008.141.019.279.028.417.02.267.041.533.041.822a10.338,10.338,0,0,1-.039,1.25l3.277,2.42a1.563,1.563,0,0,1,.265,1.691l-3.194,5.4a1.361,1.361,0,0,1-1.757.564l-3.6-1.406a13.948,13.948,0,0,1-2.2,1.266l-.579,3.755a1.493,1.493,0,0,1-1.4,1.156H12.965l-.07,0M8.957,24.57l.283.217a10.793,10.793,0,0,0,2.54,1.457l.334.136.686,4.452a.118.118,0,0,0,.131.081h6.356a.211.211,0,0,0,.179-.154l.669-4.369.324-.14a12.729,12.729,0,0,0,2.561-1.472l.283-.208,4.278,1.673c.08.036.138.017.166-.03l3.168-5.344a.317.317,0,0,0-.055-.218l-3.714-2.722.048-.372a9.11,9.11,0,0,0,.071-1.444c0-.273-.019-.509-.037-.746-.019-.267-.039-.532-.039-.819v-.314l3.568-2.74-.022-.028.02-.15L27.594,5.982a.13.13,0,0,0-.161-.046L23.139,7.616,22.853,7.4a10.854,10.854,0,0,0-2.538-1.461L19.973,5.8l-.6-4.461a.368.368,0,0,0-.18-.067H12.885a.206.206,0,0,0-.179.155l-.669,4.368-.323.138A12.72,12.72,0,0,0,9.153,7.4l-.282.21L4.592,5.941c-.08-.037-.141-.017-.165.029L1.258,11.315a.329.329,0,0,0,.084.257L4.9,14.227v.318c0,.288-.019.555-.041.822-.018.235-.036.47-.036.724s.018.489.037.724c.02.268.039.533.039.822v.314L1.338,20.69l.028.041-.017.163L4.5,26.2a.135.135,0,0,0,.161.044Zm6.958-2.432a6.047,6.047,0,0,1-.14-12.092q.141,0,.29,0a6.083,6.083,0,0,1,4.283,1.669,6.047,6.047,0,0,1-4.03,10.422h-.4m.006-10.823h-.113a4.776,4.776,0,1,0,.224,9.55h.258a4.777,4.777,0,0,0,3.182-8.232,4.732,4.732,0,0,0-3.41-1.318h-.14"
          transform="translate(0 0)"
          fill={colors.text ? colors.text : '#fff'}
        />
      </G>
    </G>
  </Svg>
)};

export default Icosettings;
