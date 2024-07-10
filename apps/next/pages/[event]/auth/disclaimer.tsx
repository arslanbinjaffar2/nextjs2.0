import Disclaimer from 'application/screens/web/auth/Disclaimer'
import AfterLoginLayout from 'application/screens/web/layouts/AfterLoginLayout'

const Index = () => {
    return (
        <>
            <Disclaimer />
        </>
    )
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}

Index.getLayout = function getLayout(page:any) {
    return (
        <AfterLoginLayout>
            {page}
        </AfterLoginLayout>
      
    )
}

export default Index
