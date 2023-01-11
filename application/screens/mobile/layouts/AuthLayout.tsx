import * as React from 'react';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};

const AuthLayout = ({ children }: Props) => {
    return <>{children}</>
};

export default AuthLayout;