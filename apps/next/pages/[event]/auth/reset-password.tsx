import ResetPasswordScreen from 'application/screens/web/auth/ResetPassword'

const ResetPassword = () => {
    return (
        <>
            <ResetPasswordScreen />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default ResetPassword