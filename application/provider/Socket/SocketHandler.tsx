import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import SocketIOClient, {SocketOptions, Socket, ManagerOptions} from "socket.io-client"
const SocketHandler = () => {
    
    const { _env } = UseEnvService()

    const { event } = UseEventService()

    const [socketConnection, setSocketConnection] = React.useState<Socket | null>(null);

    const options: Partial<ManagerOptions & SocketOptions> = React.useMemo(() => ({}), []);
  
    React.useEffect(() => {
      try {
        const socketConnect = SocketIOClient('https://stagesocket.eventbuizz.com::3000' , options);
        setSocketConnection(socketConnect);
      } catch (err) {
        console.log(err);
      }
    }, [options, _env?.socket_connection_server]);
    
    React.useEffect(() => {
     if(socketConnection !== null){
        socketConnection.on(`event-buizz:poll_question_active_inactive${event.id}`, function (data) {
            console.log(data);
        });
     }
    }, [socketConnection]);


  return null;
}

export default SocketHandler