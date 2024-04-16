import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import ToastContainer ,{Status} from 'application/components/atoms/toast/index';
import {Button, Toast } from 'native-base';


type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const [ONoff,setOnOff]=React.useState(false)
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
            <Button onPress={()=>setOnOff(true)} >
           Show Success Toast
            </Button>

        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
