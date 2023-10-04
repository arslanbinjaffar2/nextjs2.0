import ChooseProviderScreen from 'application/screens/web/auth/ChooseProvider'

const ChooseProvider = () => {
    return (
        <>
            <ChooseProviderScreen />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default ChooseProvider