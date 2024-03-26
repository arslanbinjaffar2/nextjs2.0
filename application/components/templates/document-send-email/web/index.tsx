import { Text } from 'native-base'
import React from 'react'
import { useRouter } from 'next/router';
import EmailSend from 'application/components/atoms/emailsent/index'
const Index = () => {
    const router = useRouter();
  const { id } = router.query;
  return (
   <>
   <EmailSend
   id={id}
   />
   </>
  )
}

export default Index