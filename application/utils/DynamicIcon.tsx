import React, { ComponentType, createElement } from 'react';
import { View } from 'react-native';
import IcoMyEvents from 'application/assets/icons/IcoMyEvents';
import attendees from 'application/assets/icons/attendees';
import fav_sponsors from 'application/assets/icons/mysponsers'
import message from 'application/assets/icons/chat';
// import qrcode from 'application/assets/icons/checkIn';
import qrcode from 'application/assets/icons/qrcode'
import ddirectory from 'application/assets/icons/ddirectory';
import exhibitors from 'application/assets/icons/exhibitors';
import plans from 'application/assets/icons/plans';
import help_desk from 'application/assets/icons/help_desk';
import homeMyevents from 'application/assets/icons/homeMyevents';
import gallery from 'application/assets/icons/gallery';
import practical_info from 'application/assets/icons/practical-info';
import infobooth from 'application/assets/icons/practical-info';
import general_info from 'application/assets/icons/general-info';
import additional_info from 'application/assets/icons/additional-info';
import information_pages from 'application/assets/icons/information_pages';
import maps from 'application/assets/icons/maps';
import my_attendee_list from 'application/assets/icons/myattendeelist';
import my_registrations from 'application/assets/icons/my_registrations';
import mydocuments from 'application/assets/icons/mydocuments';
import notes from 'application/assets/icons/my_notes';
import myprograms from 'application/assets/icons/myprograms';
import alerts from 'application/assets/icons/alerts';
import hdquestions from 'application/assets/icons/hdquestions'
import myexhibitors from 'application/assets/icons/myexhibitors'
import myevents from 'application/assets/icons/myevents'
import edit_account from 'application/assets/icons/edit_account'
import email_icon from 'application/assets/icons/email_icon'
import myquestions from 'application/assets/icons/myquestions'
import match from 'application/assets/icons/mykeywords'
import logout from 'application/assets/icons/logout'
import my_reservations from 'application/assets/icons/my_reservations'
import subregistration from 'application/assets/icons/subregistration'
import agendas from 'application/assets/icons/agendas';
import myturnlist from 'application/assets/icons/myturnlist';
import social from 'application/assets/icons/social_media';
import social_wall from 'application/assets/icons/social_wall';
import speakers from 'application/assets/icons/speakers';
import sponsors from 'application/assets/icons/sponsors';
import upcomingEvents from 'application/assets/icons/upcomingEvents';
import qa from 'application/assets/icons/qa';
import survey from 'application/assets/icons/survey';
import polls from 'application/assets/icons/polls';
import attendee_authority from 'application/assets/icons/attendee_authority';
import checkin_agendas from 'application/assets/icons/checkin_agendas';
import checkin from 'application/assets/icons/checkin_agendas';

import business from 'application/assets/icons/IcoNetworkInterest';
import document from 'application/assets/icons/document'
import download from 'application/assets/icons/download'
import floorplan_basic from 'application/assets/icons/floorplan_basic'
type IconProps = {
    name?: string;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
};

type IconType ='qrcode'| 'IcoMyEvents'|'infobooth' |'download' | 'logout' | 'myevents' |'document' | 'myquestions' | 'edit_account'| 'email_icon'| 'match' | 'my_reservations'|'hdquestions' | 'myexhibitors' |'subregistration'|
'fav_sponsors'| 'attendees' | 'message' | 'checkIn' | 'ddirectory' | 'exhibitors' | 'plans' | 'help_desk' | 'homeMyevents' | 'gallery' | 'practical_info' | 'general_info' | 'additional_info' | 'information_pages' | 'maps' | 'my_attendee_list' | 'mydocuments' | 'notes' | 'myprograms' | 'alerts' | 'agendas' | 'myturnlist' | 'social' | 'social_wall' | 'speakers' | 'sponsors' | 'upcomingEvents' | 'qa' | 'survey' | 'polls' | 'attendee_authority' | 'checkin_agendas' | 'checkin'| 'my_registrations' | 'business' | any;

type Props = {
    iconType: IconType;
    iconProps: IconProps;
};

const DynamicIcon: React.FC<Props> = ({ iconType, iconProps }) => {

    const iconMap: Record<IconType, ComponentType<IconProps>> = {
        IcoMyEvents,
        floorplan_basic,
        download,
        hdquestions,
        document,
        logout,
        checkin,
        edit_account,
        myexhibitors,
        my_reservations,
        myevents,
        email_icon,
        match,
        myquestions,
        subregistration,
        attendees,
        message,
        fav_sponsors,
        qrcode,
        ddirectory,
        exhibitors,
        plans,
        help_desk,
        homeMyevents,
        gallery,
        practical_info,
        infobooth,
        general_info,
        additional_info,
        information_pages,
        maps,
        my_attendee_list,
        mydocuments,
        notes,
        myprograms,
        alerts,
        agendas,
        myturnlist,
        social,
        social_wall,
        speakers,
        sponsors,
        upcomingEvents,
        qa,
        survey,
        polls,
        attendee_authority,
        checkin_agendas,
        my_registrations,
        business
    };

    const IconComponent = iconMap[iconType];

    return (
        <View>
            {IconComponent && createElement(IconComponent, { ...iconProps })}
        </View>
    );

};

export default DynamicIcon