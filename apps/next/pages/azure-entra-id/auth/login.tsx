import React from 'react';
import AADLogin from 'application/screens/web/auth/AADLogin';
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';

const Index = () => {
    console.log("Rendering Index Page");
    return (
        <>
            <h4>Azure Login</h4>
            <AADLogin />
            <div>Fallback Content: If you see this, AADLogin might not be rendering correctly.</div>
        </>
    );
};

Index.getLayout = function getLayout(page: any) {
    console.log("Applying Layouts");
    return (
        <AuthLayout>
            <BackgroundLayout>
                {page}
                <div>Fallback Content: If you see this, the layout might be causing issues.</div>
            </BackgroundLayout>
        </AuthLayout>
    );
};

export default Index;