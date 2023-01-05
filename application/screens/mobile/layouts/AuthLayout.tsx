import * as React from 'react';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {

    const { FetchEventByCode, event } = UseEventService();

    const event_id = AsyncStorageClass.getItem('eventbuizz-active-event-id');

    const { push } = useRouter();

    React.useEffect(() => {
        FetchEventByCode(event_id.toString())
    }, [event_id])

    React.useEffect(() => {
        if (Object.keys(event).length > 0 && event.id) {
            push(`/login`);
        }
    }, [event])

    return <>children</>
};

export default AuthLayout;