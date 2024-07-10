import * as React from 'react';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'next/router'

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {

    const { event,loadSettingsModules } = UseEventService();

    const { loadToken, isLoggedIn, getUser, response } = UseAuthService();

    const { push } = useRouter();
    const router = useRouter();

    React.useEffect(() => {
        getUser();
    }, [])

    const checkUserGDPR = () => {
        let requiredGDPR = event?.gdpr_settings?.enable_gdpr === 1 ? true : false;
          if(requiredGDPR){
              let userGDPRLogged = response?.data?.user?.gdpr_log;
              if(!userGDPRLogged){
                return false;
              }
          }
          return true;
    }

    React.useEffect(() => {
        if (isLoggedIn && !router.pathname.includes('/auth/disclaimer')) {
            loadSettingsModules();
            if(checkUserGDPR() === false){
                push(`/${event.url}/auth/gdpr`)
            }else{
                push(`/${event.url}/subRegistration`)
            }
        }
    }, [isLoggedIn])

    React.useEffect(() => {
        loadToken(Boolean(localStorage.getItem('access_token')));
    }, [])

    return (
        <>
            {children}
        </>
    )
};

export default AuthLayout;