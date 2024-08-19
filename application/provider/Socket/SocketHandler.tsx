import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import React, { useState } from 'react'
import SocketIOClient from "socket.io-client"
import in_array from 'in_array'
import UsePollService from 'application/store/services/UsePollService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UseSocketService from 'application/store/services/UseSocketService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import moment from 'moment';
import { useRouter as UseNextRouter } from 'next/router';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { ChatMessage } from 'application/models/chat/Chat';
import { message } from 'application/store/slices/Error.slice';
import UseToastService from 'application/store/services/UseToastService';
import UseChatService from 'application/store/services/UseChatService';
const SocketHandler = () => {
  
    const { _env } = UseEnvService()

    const { event } = UseEventService()
    
    const { response } = UseAuthService();

    const { checkPollVotingPermission } = UsePollService();

    const { checkSurveyVotingPermission } = UseSurveyService();

    const { AddNotification } = UseNotificationService();

    const { SetSocket } = UseSocketService();

    const { SocialWallPostsUpdated, SocialWallPostDeleted } = UseSocialWallService();

    const nextRouter = UseNextRouter();

    const [detailId,setDetailId] = useState<number>(0);

    const {AddSocketRequest} = UseMeetingReservationService();

    const options: any = React.useMemo(() => ({
        transports: ["websocket", "polling"]
    }), []);
  
    React.useEffect(() => {
      setDetailId(Number(nextRouter?.query?.id));
    }, [nextRouter.query]);

    type SocketNewMessageData = {
      is_new_thread: boolean;
      thread_id: number;
      message: ChatMessage;
    }
    const {AddToast} = UseToastService();
    const {PushMessageToChat,FetchChats} = UseChatService();

    React.useEffect(() => {
      
      const socketConnect = SocketIOClient(_env.socket_connection_server , options);
      SetSocket(socketConnect);

      // Polls & Survey
      socketConnect.on(`event-buizz:poll_question_active_inactive${event?.id}`, function (data:any):any {
           // show only if nt on the same poll detail page
           if(nextRouter.asPath.includes('polls/detail') && data.agenda_id == detailId){
            // skip if on same page
          }else{
            if(data.attendees == undefined || in_array(response?.attendee_detail?.id, data.attendees)){
              checkPollVotingPermission({data:data});
            }
          }
      });

      socketConnect.on(`event-buizz:survey_question_active_inactive${event?.id}`, function (data:any):any {
          // show only if nt on the same survey detail page
          if(nextRouter.asPath.includes('survey/detail') && data.survey_id == detailId){
            // skip if on same page
          }else{
            if(data.attendees == undefined || in_array(response?.attendee_detail?.id, data.attendees)){
              checkSurveyVotingPermission({data:data});
            } 
          }
      });

      socketConnect.on(`event-buizz:attendee_score_${event?.id}_${response?.attendee_detail?.id}`, function (data:any):any {
          console.log(data, 'data');
          AddNotification({
              notification:{
                type:'score',
                title:event?.labels?.NATIVE_APP_ALERT,
                text:data,
                btnLeftText:event?.labels?.GENERAL_OK,
              }
          })
      });
      
      socketConnect.on(`event-buizz:news_and_updates_alert_${event?.id}_${response?.attendee_detail?.id}`, function (data:any):any {
          // console.log(data, 'data');
          AddNotification({
              notification:{
                type:'alert',
                detail:data.description,
                btnLeftText:event?.labels?.GENERAL_OK,
                btnRightText:event?.labels?.GENERAL_DETAIL,
                ...data,
              }
          })
      });

      socketConnect.on(`event-buizz:qa_admin_block_answer_${event?.id}_${response?.attendee_detail?.id}`, function (data:any):any {
        console.log(data, 'data answer');
        if(nextRouter.asPath.includes('settings/myquestions/detail') && data?.question?.id == detailId){
        }else {
          let description = event?.labels?.GENERAL_PLEASE_CLICK.replace('{message_detail}', event?.labels?.GENERAL_MESSAGE_DETAIL);
          AddNotification({
            notification:{
              type:'qa_answer',
              title: event?.labels?.GENERAL_CHAT_NEW_MESSAGE_FROM,
              text: description,
              btnLeftText:event?.labels?.GENERAL_OK,
              btnRightText:event?.labels?.GENERAL_MESSAGE_DETAIL,
              data: data
            }
          })
        }
     
      });

      socketConnect.on(`event-buizz:social_wall_post_updated_${event?.id}`, function (data:any):any {
        console.log(data, 'data');
        SocialWallPostsUpdated({post:data.post});
      });

      socketConnect.on(`event-buizz:social_wall_post_deleted_${event?.id}`, function (data:any):any {
        console.log(data, 'data');
        SocialWallPostDeleted({post_id:data.post_id});
      });

      socketConnect.on(`event-buizz:meeting_request_alert_${event?.id}_${response?.data?.user?.id}`, function (data:any):any {
        AddSocketRequest({request:data})
      });

      socketConnect.on(`event-buizz:new_chat_message_${event?.id}_${response?.data?.user?.id}`, function (data:SocketNewMessageData):any {
        // else : show popup to user about the new message
        console.log('new message: ', data);

        // redirect to chat/detail if it is new thread and sender id is same as current user
        if (nextRouter.asPath.includes('chat/new') && data?.message?.sender_id == response?.data?.user?.id) {
          console.log('push to the chat detail');
          nextRouter.push(`/${event.url}/chat/detail/${data?.thread_id}`);
          
          // else: if user is on same chat detail page, then push the message to state 
        }else if(nextRouter.asPath.includes('chat/detail') && data?.thread_id == detailId){
          // push the message to state
          console.log('push to the state');
          PushMessageToChat({message:data?.message,thread_id:data?.thread_id});
        }else{
          // refresh chats if user is on chat listing page
          if(nextRouter.asPath.includes('chat') && !nextRouter.asPath.includes('chat/detail')){
            FetchChats({search:'',doNotShowLoading:true});
          }
          // show popup to user about the new message
          console.log('adding toast');
          if(Number(event?.attendee_settings?.display_chat_notification) === 1){
            AddNotification({
              notification:{
                type:'chat',
                title:data?.message?.sender?.first_name + ' ' + data?.message?.sender?.last_name,
                text:data?.message?.body,
                btnLeftText:event?.labels?.CHAT_OK ,
                btnRightText:event?.labels?.CHAT_DETAILS,
                url:`/chat/detail/${data?.thread_id}`
              }
            })
          }
       
        }         
      });
      
      return () =>{
        socketConnect.disconnect();
        SetSocket(null);
      }
    }, [options, _env?.socket_connection_server,detailId,nextRouter.asPath]);
    
    


  return null;
}

export default SocketHandler

