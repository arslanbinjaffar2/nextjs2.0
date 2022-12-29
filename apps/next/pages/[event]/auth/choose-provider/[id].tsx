import ChoosePasswordScreen from 'application/screens/web/auth/ChoosePassword'

const ChoosePassword = () => {
    return (
        <>
            <ChoosePasswordScreen />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default ChoosePassword