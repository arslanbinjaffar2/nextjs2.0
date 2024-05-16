const ConvertToPopupObject = (notification:any, type: string): any => {
    
    if(type == 'alert'){
        return  {
            id:notification.id,
            type:'alert',
            title:notification?.title,
            text:notification?.detail,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:'/alerts',
        }
    }
    if(type == 'qa_answer'){
        return  {
            type:'qa_answer',
            title:notification?.title+ " Q&A",
            text:notification?.text,
            data:notification?.data,
            btnLeftText:'OK',
            btnRightText:notification?.btnText,
            url:'/qa',
        }
    }
    if(type == 'poll'){
        return  {
            type:'poll',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:notification.url,
        }
    }
    if(type == 'survey'){
        return  {
            type:'survey',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:notification.url,
        }
    }
    if(type == 'score'){
        return  {
            type:'score',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
        }
    }
    if(type == 'reservation'){
        return  {
            type:'reservation',
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'',
        }
    }
}

export default ConvertToPopupObject