import React, { useEffect } from 'react'
import UseRequestToSpeakService from 'application/store/services/useRequestToSpeakService';


const Index = () => {

    const { programs, FetchActivePrograms } = UseRequestToSpeakService();


    useEffect(() => {
        FetchActivePrograms();
    }, []);
       


    return (
        <>
        </>
    )
}

export default Index