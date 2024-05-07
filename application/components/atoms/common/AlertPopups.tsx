import * as React from 'react';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import AlertPopup from 'application/components/atoms/AlertPopup';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UseAlertService from 'application/store/services/UseAlertService';



const AlertPopups = () => {

    const { event } = UseEventService();
  
    const { popupCount, setCurrentPopup, currentPopup, clearCurrentPopup } = UseNotificationService();
  
    const { unread, setUnreadCount } = UseAlertService();
    
    const router = useRouter();
    
    const [alertCount, setAlertCount] = React.useState(0);
  
    const [isOpen, setIsOpen] = React.useState(false);
  
    const [alertData, setAlertData] = React.useState<any>(null);
    
    const onClose = () => setIsOpen(false);
  
    const onBtnLeftClick = () => {
      console.log(alertData);
      clearCurrentPopup();
      onClose();
    };
  
    const onBtnRightClick = () =>{
      
      if(alertData.type == 'alert'){
        router.push(`/${event.url}/alerts/detail/${alertData.id}`)
      }else {
        if(alertData.url !== undefined){
          router.push(`/${event.url}${alertData.url}`)
        }
      }
      clearCurrentPopup();
      onClose();
    };
  
    const cancelRef = React.useRef(null);
  
    React.useEffect(() => {
      if(popupCount > 0 && currentPopup == null){
        setCurrentPopup();
      }
    }, [popupCount])
    
    React.useEffect(() => {
      if(currentPopup !== null){
        setAlertData(currentPopup);
        if(currentPopup.type == 'alert'){
          setUnreadCount(unread + 1);
        }
        setAlertCount(alertCount+1);
        setIsOpen(true);
      }else{
        setAlertData(null);
      }
    }, [currentPopup])

    return (
            <>
            {alertData !== null && <AlertPopup
                    key={alertCount}
                    isOpen={isOpen}
                    onClose={()=>{
                    clearCurrentPopup();
                    onClose();
                    }}
                    btnLeftFunc={onBtnLeftClick}
                    btnRightFunc={onBtnRightClick}
                    cancelRef ={cancelRef}
                    title={alertData?.title}
                    text={alertData?.text}
                    btnLeftText={alertData?.btnLeftText ? alertData?.btnLeftText : 'OK'}
                    btnRightText={alertData?.btnRightText ? alertData?.btnRightText : ''}
                />}
            </>
    );

};

export default AlertPopups;
