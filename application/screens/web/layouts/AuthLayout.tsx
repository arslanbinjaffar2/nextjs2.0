import * as React from 'react';
import UseEventService from 'application/services/UseEventService';
import { useRouter } from 'solito/router'

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {

    const { event } = UseEventService();

    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    const { push } = useRouter();

    React.useEffect(() => {
        if (isLoggedIn) {
            push(`/${event.url}/qa`)
        }
    }, [isLoggedIn])

    return (
        <>
            {children}
        </>
    )
};

export default AuthLayout;