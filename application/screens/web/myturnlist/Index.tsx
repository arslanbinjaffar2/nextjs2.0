import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Toast } from 'native-base';
import ToastContainer, { Status } from 'application/components/atoms/toast/index'
type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'myturnlist');
    React.useEffect(()=>{
        if(true){
            Toast.show({
                placement:"bottom-right",
                duration:50000,
               
                render: () => {
                  return (
                    <ToastContainer message='helo' status={Status.Success}/>
                  )
                }
              })
        }
    },[])
    return (
        <>
            <NextBreadcrumbs module={module} />
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
