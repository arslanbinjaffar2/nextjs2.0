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
            btnRightText:'Detail',
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