import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import SocketIOClient from "socket.io-client"
import in_array from 'in_array'
import UsePollService from 'application/store/services/UsePollService';
import UseSurveyService from 'application/store/services/UseSurveyService';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UseSocketService from 'application/store/services/UseSocketService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import moment from 'moment';
const SocketHandler = () => {
  
    const { _env } = UseEnvService()

    const { event } = UseEventService()

    const { response } = UseAuthService();

    const { checkPollVotingPermission } = UsePollService();

    const { checkSurveyVotingPermission } = UseSurveyService();

    const { AddNotification } = UseNotificationService();

    const { SetSocket } = UseSocketService();

    const { SocialWallPostsUpdated } = UseSocialWallService();


    const options: any = React.useMemo(() => ({
        transports: ["websocket", "polling"]
    }), []);
  
    React.useEffect(() => {
      
      const socketConnect = SocketIOClient(_env.socket_connection_server , options);
      SetSocket(socketConnect);

      // Polls & Survey
      socketConnect.on(`event-buizz:poll_question_active_inactive${event?.id}`, function (data:any):any {
          console.log(data, 'data');
          if(data.attendees == undefined || in_array(response?.attendee_detail?.id, data.attendees)){
            checkPollVotingPermission({data:data});
          }
      });
      
      socketConnect.on(`event-buizz:survey_question_active_inactive${event?.id}`, function (data:any):any {
          console.log(data, 'data');
          if(data.attendees == undefined || in_array(response?.attendee_detail?.id, data.attendees)){
            checkSurveyVotingPermission({data:data});
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
      
      socketConnect.on(`event-buizz:news_and_updates_alert_${event?.id}`, function (data:any):any {
          console.log(data, 'data');
          AddNotification({
              notification:{
                type:'alert',
                detail:data.description,
                ...data,
              }
          })
      });

      socketConnect.on(`event-buizz:social_wall_post_updated_${event?.id}`, function (data:any):any {
        console.log(data, 'data');
        SocialWallPostsUpdated({post:data.post});
    });

      return () =>{
        socketConnect.disconnect();
        SetSocket(null);
      }
    }, [options, _env?.socket_connection_server]);
    
    


  return null;
}

export default SocketHandler

