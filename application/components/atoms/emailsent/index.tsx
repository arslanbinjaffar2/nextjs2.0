import { sendDocumentEmailApi } from 'application/store/api/DocumentApi';
import { store } from 'application/store/Index';
import { Center, HStack, TextArea,Input, Text, Container, Button, FormControl } from 'native-base';
import React, { useEffect, useState } from 'react'

const EmailSend = ({id}:{id:any}) => {
    const [emailData, setEmailData] = React.useState(
        { email: '',  subject: '', comments: '' }
        );
        const [errors, setErrors] = React.useState(   
            { email: '',  subject: '', comments: '' }    
            );
        const [loading,setLoading]=useState(false)
        const [alert,setAlert]=useState("")
        const validateForm=()=>{
            if(errors.email.trim()=="" && errors.email.length>0){
                return setErrors({...errors,email:"email is required"})
            }
        }
    async function sendEmail() {     
        const mystate=store.getState()
        setLoading(true);
        try {
        await sendDocumentEmailApi({...emailData,document_id:id}, mystate); // Call the API function
        setLoading(false);
        setAlert('Email sent successfully');
         setEmailData( { email: '',  subject: '', comments: '' })
        } catch (error) {
          console.log('error', error);
         setEmailData( { email: '',  subject: '', comments: '' })

        }
    }

    useEffect(()=>{
      setTimeout(() => {
        if(alert){
            setErrors( { email: '',  subject: '', comments: '' }   )
        }
        
      }, 1000);
    },[])
  return (
    <> 
    <Container bg="primary.box" rounded="md" mb="3" maxW="100%" w="100%" p={2}>
        <HStack mb="3" alignItems={["flex-start","center"]} p   ="6" flexDirection={['column', 'row']}  w="100%">
                            <FormControl isRequired isInvalid={emailData.email.trim().length < 3 && emailData.email.trim().length > 0} alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <FormControl.Label  fontWeight="500" fontSize="16px" textTransform={'capitalize'}
                                
                                >{'Email'}</FormControl.Label>
                            </FormControl>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
									placeholder='email'	
                                    type={'text'}
                                    isRequired={true}		
                                    onChangeText={(text) => setEmailData({ ...emailData, email: text })}
                                    value={emailData.email}
                                    h={'50px'}
                                />
                                
                            </Center>
                        </HStack>
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <FormControl isRequired isInvalid={emailData.subject.trim().length < 3 && emailData.subject.trim().length > 0} alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text  isTruncated fontWeight="500" fontSize="16px" textTransform={'capitalize'}>{'subject'}</Text>
                            </FormControl>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                               type={'text'}
                               isRequired={true}	
                                placeholder='subject'
								h={'50px'}
                                onChangeText={(text) => setEmailData({ ...emailData, subject: text })}
                                value={emailData.subject}

                                />
                            </Center>
                        </HStack>
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px" textTransform={'capitalize'}>{'comments'}</Text>
                            </Center>
                            <Center borderWidth={'0'} bg={'primary.box'} justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <TextArea
                                bg={'primary.darkbox'}
                                placeholder='comments'
                                autoCompleteType={''}
                                w="100%"
								h={'100px'}
                                isRequired={true}	
                                onChangeText={(text) => setEmailData({ ...emailData, comments: text })}
                                                        value={emailData.comments}
                                />
                            </Center>
                        </HStack>
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px" textTransform={'capitalize'}>{'Shared link'}</Text>
                            </Center>
                            <Center borderWidth={'0'} justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Text 
                                 fontWeight="500" fontSize="16px"   
                                w="100%"
                                >
                                    https://eb-s3-uploads.s3.eu-west-1.amazonaws.com/assets/ directory/image_18105037551621842305.jpg
                                </Text>
                            </Center>
                        </HStack>
                        </Container>
                        <Button
                    minW={225}
                    py="2"
                    px="9"
                    mx={'auto'}
					shadow={3}
                    isLoading={loading}
                    colorScheme="primary"
                    onPress={()=>sendEmail()}
                  
                >
                    <Text fontSize="2xl" fontWeight={600}>Send E-mail</Text>
                    {alert && <Text fontSize="md" color={'primary.text'} fontWeight={600}>{alert}</Text>}
                </Button>
    </>


  )
}

export default EmailSend