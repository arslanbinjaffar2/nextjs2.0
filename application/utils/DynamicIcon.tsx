import React, { ComponentType, createElement } from 'react';
import { View } from 'react-native';
import IcoMyEvents from 'application/assets/icons/IcoMyEvents';
import attendees from 'application/assets/icons/attendees';
import chat from 'application/assets/icons/chat';
import checkIn from 'application/assets/icons/checkIn';

type IconProps = {
    name?: string;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
};

type IconType = 'IcoMyEvents' | 'attendees' | 'chat' | 'checkIn';

type Props = {
    iconType: IconType;
    iconProps: IconProps;
};

const DynamicIcon: React.FC<Props> = ({ iconType, iconProps }) => {

    const iconMap: Record<IconType, ComponentType<IconProps>> = {
        IcoMyEvents,
        attendees,
        chat,
        checkIn,
    };

    const IconComponent = iconMap[iconType];

    return (
        <View>
            {IconComponent && createElement(IconComponent, { ...iconProps })}
        </View>
    );

};

export default DynamicIcon