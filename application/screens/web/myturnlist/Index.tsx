import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { Button, Toast } from 'native-base';
import ToastContainer, { Status } from 'application/components/atoms/toast/index'
import { ToastActions } from 'application/store/slices/Toast.Slice';
import { useAppDispatch, useAppSelector } from 'application/store/Hooks';
type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'myturnlist');
    const dispatch=useAppDispatch()
    const {addtoast}=ToastActions   
   
    return (
        <>
            <NextBreadcrumbs module={module} />
    <Button
                colorScheme="primary"
                onPress={()=>{
                    dispatch(addtoast({status:"error",message:"heelo "}))
                }}
            
            >
                Primary
            </Button>
          
        </>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
