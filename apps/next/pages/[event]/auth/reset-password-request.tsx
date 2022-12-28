import ResetPasswordRequestScreen from 'application/screens/web/auth/ResetPasswordRequest'

const ResetPasswordRequest = () => {
    return (
        <>
            <ResetPasswordRequestScreen />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default ResetPasswordRequest