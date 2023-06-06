import PageDetail from 'application/screens/web/event-information/PageDetail';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Detail() {
    const router = useRouter();
    useEffect(() => {
        console.log(router.query)
      }, [])

    
    return <p>Post: {router.query.slug}</p>;
  }