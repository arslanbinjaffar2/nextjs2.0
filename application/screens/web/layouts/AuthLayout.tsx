import * as React from 'react';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'solito/router'

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {

    const { event,loadSettingsModules } = UseEventService();

    const { loadToken, isLoggedIn, getUser } = UseAuthService();

    const { push } = useRouter();

    React.useEffect(() => {
        getUser();
    }, [])

    React.useEffect(() => {
        if (isLoggedIn) {
            loadSettingsModules();
            push(`/${event.url}/subRegistration`)
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