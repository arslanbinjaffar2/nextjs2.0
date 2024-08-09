import * as React from 'react';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import usePostLoginFlowMiddleware from 'application/middlewares/usePostLoginFlowMiddleware';
import { useRouter } from 'solito/router';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {
    const { event, event_url } = UseEventService();
    const { loadToken, getUser, onboarding, isLoggedIn } = UseAuthService();
    const { push } = useRouter();

    React.useEffect(() => {
        const fetchUser = async () => {
          await getUser();
        };
        fetchUser();
    }, []);

    React.useEffect(() => {
        loadToken(Boolean(localStorage.getItem(`access_token_${event_url}`)));
    }, [])

    React.useEffect(() => {
        usePostLoginFlowMiddleware({ event, event_url, onboarding, push });
    }, [onboarding, isLoggedIn])

    return (
        <>
            {children}
        </>
    )
};

export default AuthLayout;