import GDPR from 'application/screens/web/auth/GDPR'
import AfterLoginLayout from 'application/screens/web/layouts/AfterLoginLayout'
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout'

const Index = () => {
    return (
        <>
            <GDPR />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

Index.getLayout = function getLayout(page: any) {
    return (
        <AfterLoginLayout>
            {page}
        </AfterLoginLayout>

    )
}

export default Index
