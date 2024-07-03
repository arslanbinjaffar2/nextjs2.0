import React, { ComponentType, createElement } from 'react';
import { View } from 'react-native';
import edit_profile from 'application/assets/icons/edit_profile';
import IcoMyEvents from 'application/assets/icons/IcoMyEvents';
import attendees from 'application/assets/icons/attendees';
import myattendees from 'application/assets/icons/myattendees';
import request_to_speak from 'application/assets/icons/request_to_speak';
import fav_sponsors from 'application/assets/icons/mysponsers'
import message from 'application/assets/icons/chat';
import chat from 'application/assets/icons/chat';
import checkIn from 'application/assets/icons/checkIn';
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
import my_sub_registrations from 'application/assets/icons/mydocuments';
import notes from 'application/assets/icons/notes';
import my_notes from 'application/assets/icons/my_notes';
import editnotes from 'application/assets/icons/editnotes';
import myagendas from 'application/assets/icons/myagendas';
import myprograms from 'application/assets/icons/myagendas';
import alerts from 'application/assets/icons/alerts';
import hdquestions from 'application/assets/icons/hdquestions'
import myexhibitors from 'application/assets/icons/myexhibitors'
import myevents from 'application/assets/icons/myevents'
import edit_account from 'application/assets/icons/edit_account'
import email_icon from 'application/assets/icons/email_icon'
import myquestions from 'application/assets/icons/myquestions'
import match from 'application/assets/icons/mykeywords'
import mykeywords from 'application/assets/icons/mykeywords'
import logout from 'application/assets/icons/logout'
import my_reservations from 'application/assets/icons/my_reservations'
import reservation from 'application/assets/icons/reservation'
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
import myPollResults from 'application/assets/icons/myPollResults';
import attendee_authority from 'application/assets/icons/attendee_authority';
import checkin_agendas from 'application/assets/icons/checkin_agendas';
import checkin from 'application/assets/icons/checkin_agendas';
import business from 'application/assets/icons/IcoNetworkInterest';
import network_interest from 'application/assets/icons/IcoNetworkInterest';
import document from 'application/assets/icons/document'
import download from 'application/assets/icons/download'
import checkcircle from 'application/assets/icons/checkcircle'
import cancelcircle from 'application/assets/icons/cancelcircle'
import close from 'application/assets/icons/close'
import floorplan_basic from 'application/assets/icons/floorplan_basic'
import editprofile from 'application/assets/icons/editprofile'
import myreservation from 'application/assets/icons/myreservation'
import upcoming_events from 'application/assets/icons/upcoming_events'
import certificate from 'application/assets/icons/certificate'
import mybookings from 'application/assets/icons/mybookings'
import mySurveyResults from 'application/assets/icons/mySurveyResults'
import livesurveys from 'application/assets/icons/mySurveyResults'
import attendee_Match from 'application/assets/icons/attendee_Match'
import star from 'application/assets/icons/star'
import staro from 'application/assets/icons/staro'
import save from 'application/assets/icons/save'
import edit_order from 'application/assets/icons/edit_order'
import Notattending from 'application/assets/icons/Notattending'
import register from 'application/assets/icons/register'
import delete_icon from 'application/assets/icons/delete'
import share_account from 'application/assets/icons/share_account'
import download_2 from 'application/assets/icons/download_2'
import email from 'application/assets/icons/email'
import share from 'application/assets/icons/share'
import dropdown from 'application/assets/icons/dropdown'
import upload from 'application/assets/icons/upload'
import icosort from 'application/assets/icons/small/IcoSort'
type IconProps = {
    name?: string;
    color?: string;
    size?: number;
    width?: number;
    height?: number;
};

type IconType ='qrcode'| 'IcoMyEvents'|'infobooth' |'download' | 'logout' | 'myevents' |'document' | 'myquestions' | 'edit_account'| 'email_icon'| 'match' | 'my_reservations'|'hdquestions' | 'myexhibitors' |'subregistration'|
'fav_sponsors'| 'attendees' | 'myattendees' | 'message' | 'chat' | 'checkIn' | 'ddirectory' | 'exhibitors' | 'plans' | 'help_desk' | 'homeMyevents' | 'gallery' | 'practical_info' | 'general_info' | 'additional_info' | 'information_pages' | 'maps' | 'my_attendee_list' | 'mydocuments' | 'notes' | 'myagendas' | 'myprograms' | 'alerts' | 'agendas' | 'myturnlist' | 'social' | 'social_wall' | 'speakers' | 'sponsors' | 'upcomingEvents' | 'qa' | 'survey' | 'polls' | 'attendee_authority' | 'checkin_agendas' | 'checkin' | 'my_registrations' | 'business' | 'request_to_speak' | 'editprofile' | 'mykeywords' | 'myreservation' | 'my_notes' | 'upcoming_events' | 'reservation' | 'certificate' | 'editnotes' | 'mybookings' 
|'checkcircle'|'cancelcircle' | 'close' | 'edit_profile' | 'myPollResults' | 'mySurveyResults' | 'my_sub_registrations' | 'network_interest' | 'livesurveys'| 'attendee_Match' | 'star'| 'staro'| 'save' | 'edit_order' | 'Notattending'|'register' | 'delete_icon'| 'share_account'|'download_2'| 'email' |'share'| 'dropdown' | 'upload' | 'icosort'| any;

type Props = {
    iconType: IconType;
    iconProps: IconProps;
};

const DynamicIcon: React.FC<Props> = ({ iconType, iconProps }) => {

    const iconMap: Record<IconType, ComponentType<IconProps>> = {
        close,
        checkcircle,
        cancelcircle,
        edit_profile,
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
        myattendees,
        message,
        chat,
        checkIn,
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
        myagendas,
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
        business,
        request_to_speak,
        editprofile,
        mykeywords,
        myreservation,
        my_notes,
        upcoming_events,
        reservation,
        certificate,
        editnotes,
        mybookings,
        myPollResults,
        mySurveyResults,
        my_sub_registrations,
        network_interest,
        livesurveys,
        attendee_Match,
        star,
        staro,
        save,
        edit_order,
        Notattending,
        register,
        delete_icon,
        share_account,
        download_2,
        email,
        share,
        dropdown,
        upload,
        icosort
    };

    const IconComponent = iconMap[iconType];

    return (
        <View>
            {IconComponent && createElement(IconComponent, { ...iconProps })}
        </View>
    );

};

export default DynamicIcon