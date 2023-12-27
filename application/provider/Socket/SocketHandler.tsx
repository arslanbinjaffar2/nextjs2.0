import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import SocketIOClient from "socket.io-client"
import in_array from 'in_array'
import UsePollService from 'application/store/services/UsePollService';
const SocketHandler = () => {
  
  

    const { _env } = UseEnvService()

    const { event } = UseEventService()

    const { response } = UseAuthService();

    const { checkPollVotingPermission } = UsePollService();

    const options: any = React.useMemo(() => ({
        transports: ["websocket", "polling"]
    }), []);
  
    React.useEffect(() => {
      
      const socketConnect = SocketIOClient(_env.socket_connection_server , options);
      

      // Polls & Survey
      socketConnect.on(`event-buizz:poll_question_active_inactive${event.id}`, function (data:any):any {
          console.log(data, 'data');
          if(data.attendees == undefined || in_array(response?.attendee_detail?.id, data.attendees)){
            checkPollVotingPermission({data:data});
          }
      });
      
      socketConnect.on(`event-buizz:survey_question_active_inactive${event.id}`, function (data:any):any {
          console.log(data, 'data');
      });

      socketConnect.on(`event-buizz:attendee_score_${event.id}_${response.attendee_detail.id}`, function (data:any):any {
          console.log(data, 'data');
      });

      

      return () =>{
        socketConnect.disconnect();
      }
    }, [options, _env?.socket_connection_server]);
    
    


  return null;
}

export default SocketHandler