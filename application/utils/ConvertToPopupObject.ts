const readDocument = (notification:any, type: string): any => {
    
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
}

export default readDocument