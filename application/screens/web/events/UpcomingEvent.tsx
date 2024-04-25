import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import ToastContainer ,{Status} from 'application/components/atoms/toast/index';
import {Button, Toast } from 'native-base';

import { Text } from 'native-base';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const [ONoff,setOnOff]=React.useState(false)
    const { event } = UseEventService()
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'upcomingEvents');
    // const { showToast,Toast } = useToast();

    // const handleSuccess = () => {
    //   showToast(Status.Success, 'Action completed successfully!');
    // };
  
    // const handleError = () => {
    //   showToast(Status.Error, 'An error occurred!');
    // };
    React.useEffect(() => {
        if (ONoff) {
            Toast.show(
                {
                    render: () =>(
                        <ToastContainer />
                        )
                        
                    })
                    
                }
      
    }, [ONoff])
    
    return (
        <>
            <NextBreadcrumbs module={module} />
            <Text p={5} mb="3" bg="primary.box" rounded="lg" w="100%">{event?.labels?.GENERAL_NO_RECORD}</Text>
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
