import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'application/styles';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const BackgroundLayout = ({ children }: Props) => {
    const { FetchEvent, event } = UseEventService()

    const colors = getColorScheme('#343d50');
    const gStyles = gStyle(colors);
    return (
            <>
                <ImageBackground blurRadius={8} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode='cover' source={{ uri: images.SplashImage }}>
                    <View style={{ ...gStyles.flex1, ...gStyles.bgContainer }} />
                </ImageBackground>
                {children}
            </>
    )
};

export default BackgroundLayout;