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
const SocketHandler = () => {
  
    const { _env } = UseEnvService()

    const { event } = UseEventService()
    console.log("🚀 ~ SocketHandler ~ event:", event?.labels?.GENERAL_CHAT_NEW_MESSAGE_FROM)

    const { response } = UseAuthService();

    const { checkPollVotingPermission } = UsePollService();

    const { checkSurveyVotingPermission } = UseSurveyService();

    const { AddNotification } = UseNotificationService();

    const { SetSocket } = UseSocketService();

    const { SocialWallPostsUpdated, SocialWallPostDeleted } = UseSocialWallService();

    const nextRouter = UseNextRouter();

    const [detailId,setDetailId] = useState<number>(0);

    const options: any = React.useMemo(() => ({
        transports: ["websocket", "polling"]
    }), []);
  
    React.useEffect(() => {
      setDetailId(Number(nextRouter?.query?.id));
    }, [nextRouter.query]);

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
                title:'Alert',
                text:data,
              }
          })
      });
      
      socketConnect.on(`event-buizz:news_and_updates_alert_${event?.id}_${response?.attendee_detail?.id}`, function (data:any):any {
          console.log(data, 'data');
          AddNotification({
              notification:{
                type:'alert',
                detail:data.description,
                ...data,
              }
          })
      });

      socketConnect.on(`event-buizz:qa_admin_block_answer_${event?.id}_${response?.attendee_detail?.id}`, function (data:any):any {
        // console.log(data, 'data answer agyga');
        let description = event?.labels?.GENERAL_PLEASE_CLICK.replace('{message_detail}', event?.labels?.GENERAL_MESSAGE_DETAIL);
          AddNotification({
            notification:{
              type:'qa_answer',
              title: event?.labels?.GENERAL_CHAT_NEW_MESSAGE_FROM,
              text: description,
              btnText: event?.labels?.GENERAL_MESSAGE_DETAIL,
              data: data
            }
          })
      });

      socketConnect.on(`event-buizz:social_wall_post_updated_${event?.id}`, function (data:any):any {
        console.log(data, 'data');
        SocialWallPostsUpdated({post:data.post});
      });

      socketConnect.on(`event-buizz:social_wall_post_deleted_${event?.id}`, function (data:any):any {
        console.log(data, 'data');
        SocialWallPostDeleted({post_id:data.post_id});
      });

      return () =>{
        socketConnect.disconnect();
        SetSocket(null);
      }
    }, [options, _env?.socket_connection_server,detailId]);
    
    


  return null;
}

export default SocketHandler

