import React, { ComponentType, createElement } from 'react';
import { View } from 'react-native';
import IcoMyEvents from 'application/assets/icons/IcoMyEvents';
import attendees from 'application/assets/icons/attendees';
import chat from 'application/assets/icons/chat';
import checkIn from 'application/assets/icons/checkIn';
import ddirectory from 'application/assets/icons/ddirectory';
import exhibitors from 'application/assets/icons/exhibitors';
import plans from 'application/assets/icons/plans';
import help_desk from 'application/assets/icons/help_desk';
import homeMyevents from 'application/assets/icons/homeMyevents';
import gallery from 'application/assets/icons/gallery';
import infobooth from 'application/assets/icons/infobooth';
import general_info from 'application/assets/icons/general_info';
import additional_info from 'application/assets/icons/additional_info';
import information_pages from 'application/assets/icons/information_pages';
import maps from 'application/assets/icons/maps';
import myattendees from 'application/assets/icons/myattendees';
import mydocuments from 'application/assets/icons/mydocuments';
import my_notes from 'application/assets/icons/my_notes';
import myagendas from 'application/assets/icons/myagendas';
import alerts from 'application/assets/icons/alerts';
import agendas from 'application/assets/icons/agendas';
import myturnlist from 'application/assets/icons/myturnlist';
import social from 'application/assets/icons/social';
import social_wall from 'application/assets/icons/social_wall';
import speakers from 'application/assets/icons/speakers';
import sponsors from 'application/assets/icons/sponsors';
import upcomingEvents from 'application/assets/icons/upcomingEvents';

type IconProps = {
    name?: string;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
};

type IconType = 'IcoMyEvents' | 'attendees' | 'chat' | 'checkIn' | 'ddirectory' | 'exhibitors' | 'plans' | 'help_desk' | 'homeMyevents' | 'gallery' | 'infobooth' | 'general_info' | 'additional_info' | 'information_pages' | 'maps' | 'myattendees' | 'mydocuments' | 'my_notes' | 'myagendas' | 'alerts' | 'agendas' | 'myturnlist' | 'social' | 'social_wall' | 'speakers' | 'sponsors' | 'upcomingEvents';

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
        ddirectory,
        exhibitors,
        plans,
        help_desk,
        homeMyevents,
        gallery,
        infobooth,
        general_info,
        additional_info,
        information_pages,
        maps,
        myattendees,
        mydocuments,
        my_notes,
        myagendas,
        alerts,
        agendas,
        myturnlist,
        social,
        social_wall,
        speakers,
        sponsors,
        upcomingEvents,
    };

    const IconComponent = iconMap[iconType];

    return (
        <View>
            {IconComponent && createElement(IconComponent, { ...iconProps })}
        </View>
    );

};

export default DynamicIcon