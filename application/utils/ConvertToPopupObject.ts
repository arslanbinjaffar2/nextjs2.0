const ConvertToPopupObject = (notification:any, type: string): any => {
    
    if(type == 'alert'){
        return  {
            title:notification?.title,
            text:notification?.detail,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:'/alerts',
        }
    }
    if(type == 'poll'){
        return  {
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:notification.url,
        }
    }
    if(type == 'survey'){
        return  {
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'Detail',
            url:notification.url,
        }
    }
    if(type == 'score'){
        return  {
            title:notification?.title,
            text:notification?.text,
            btnLeftText:'OK',
            btnRightText:'Detail',
        }
    }
}

export default ConvertToPopupObject