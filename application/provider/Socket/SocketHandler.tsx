import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import SocketIOClient from "socket.io-client"
const SocketHandler = () => {
    
    const { _env } = UseEnvService()

    const { event } = UseEventService()

    const options: any = React.useMemo(() => ({
        transports: ["websocket", "polling"]
    }), []);
  
    React.useEffect(() => {
      
      const socketConnect = SocketIOClient(_env.socket_connection_server , options);
      
      socketConnect.on(`event-buizz:poll_question_active_inactive${event.id}`, function (data:any):any {
          console.log(data, 'data');
      });

      return () =>{
        socketConnect.disconnect();
      }
    }, [options, _env?.socket_connection_server]);
    
    


  return null;
}

export default SocketHandler