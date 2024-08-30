import { useRouter } from 'solito/router';
import { UseEventService } from 'application/store/services';
const Index = () => {
  const { push } = useRouter()
  const { event } = UseEventService()
  push(`/${event?.url}/dashboard`)
}

export default Index