import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'application/styles';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const BackgroundLayout = ({ children }: Props) => {
    const { event } = UseEventService()
    const { updateEnv, _env } = UseEnvService()

    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    const gStyles = gStyle(colors);

    return (
            <>
                <ImageBackground blurRadius={8} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode='cover' source={{ uri:`${_env.eventcenter_base_url}/assets/event/app_background/${event.settings?.app_background_image}`  }}>
                    <View style={{ ...gStyles.flex1, ...gStyles.bgContainer }} />
                </ImageBackground>
                {children}
            </>
    )
};

export default BackgroundLayout;