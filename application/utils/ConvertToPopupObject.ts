const ConvertToPopupObject = (notification:any, type: string): any => {
    
    if(type == 'alert'){
        return  {
            id:notification.id,
            type:'alert',
            title:notification?.title,
            text:notification?.detail,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:'/alerts'
        }
    }
    if(type == 'qa_answer'){
        return  {
            type:'qa_answer',
            title:notification?.title+ " Q&A",
            text:notification?.text,
            data:notification?.data,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:'/settings/myquestions/detail/'+notification?.data?.question?.id,
        }
    }
    if(type == 'poll'){
        return  {
            type:'poll',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:notification.url,
        }
    }
    if(type == 'survey'){
        return  {
            type:'survey',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:notification.url,
        }
    }
    if(type == 'score'){
        return  {
            type:'score',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
        }
    }
    if(type == 'reservation'){
        return  {
            type:'reservation',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
        }
    }
    if(type == 'program-fav-error'){
        return  {
            type:'program-fav-error',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
        }
    }
    if(type == 'chat'){
        return  {
            type:'chat',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:notification?.url,
        }
    }
    if(type == 'pending-appointment-alert'){
        return  {
            type:'pending-appointment-alert',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:notification?.btnLeftText,
            btnRightText:notification?.btnRightText,
            url:notification?.url,
        }
    }
}

export default ConvertToPopupObject