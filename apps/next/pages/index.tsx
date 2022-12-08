import Login from 'application/screens/auth/login/web/Login'

const Index = () => {

    return (
        <>
            <Login />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

export default Index
