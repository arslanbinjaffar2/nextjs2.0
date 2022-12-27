import Login from 'application/screens/web/auth/Login'

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
