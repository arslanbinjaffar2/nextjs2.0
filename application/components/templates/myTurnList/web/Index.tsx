import React, { useEffect } from 'react'
import UseRequestToSpeakService from 'application/store/services/UseRequestToSpeakService';
import WebLoading from 'application/components/atoms/WebLoading';


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