import VerificationScreen from 'application/screens/web/auth/Verification'

const Verification = () => {
    return (
        <VerificationScreen />
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default Verification