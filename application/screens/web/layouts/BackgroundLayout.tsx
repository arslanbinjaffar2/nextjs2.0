import * as React from 'react';
import { ImageBackground } from 'react-native';
import { gStyle, images } from 'application/styles';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { Button, Toast, View } from 'native-base';


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
                <ImageBackground blurRadius={15} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode='cover' source={{ uri:`${_env.eventcenter_base_url}/assets/event/app_background/${event.settings?.app_background_image}`  }}>
                    <View flex={1} bg={'primary.100'} style={event.settings?.app_background_image ? {...gStyles.bgContainer} : {...gStyles.bgContainerSolid}} > 
                   </View>
                </ImageBackground>
                {children}
            </>
    )
};

export default BackgroundLayout;