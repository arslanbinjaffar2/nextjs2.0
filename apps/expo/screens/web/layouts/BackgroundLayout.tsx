import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'app/styles';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const BackgroundLayout = ({ children }: Props) => (
    <>
        <ImageBackground blurRadius={8} style={{ position: 'fixed', width: '100%', height: '100%' }} resizeMode='cover' source={images.SplashImage}>
            <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }} />
        </ImageBackground>
        {children}
    </>
);

export default BackgroundLayout;