import { sendDocumentEmailApi } from 'application/store/api/DocumentApi';
import { store } from 'application/store/Index';
import { Center, HStack, TextArea,Input, Text, Container, Button, FormControl } from 'native-base';
import React, { useEffect, useState } from 'react'
import UseEventService from 'application/store/services/UseEventService';

const EmailSend = ({id}:{id:any}) => {
    const [emailData, setEmailData] = React.useState({ email: '',  subject: '', comments: '' });
    const [errors, setErrors] = React.useState({ email: '',  subject: '', comments: '' });
    const [loading,setLoading]=useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { event } = UseEventService();

    const validateForm = () => {
        if (emailData.email.trim() === "") {
            return setErrors({...errors, email: event?.labels?.REGISTRATION_FORM_FIELD_REQUIRED});
        }else if(!emailRegex.test(emailData.email.trim())) {
            return setErrors({...errors, email: event?.labels?.GENERAL_VALID_ENTER_EMAIL_MSG});
        }
            else if (emailData.subject.trim() === "") {
            return setErrors({...errors, subject: event?.labels?.REGISTRATION_FORM_FIELD_REQUIRED});
        }else {
            sendEmail();
            setErrors(      { email: '',  subject: '', comments: '' }  )
        }
    };

    async function sendEmail() {     
        const mystate=store.getState()
        setLoading(true);
        try {
        const {data}=await sendDocumentEmailApi({...emailData,document_id:id}, mystate); // Call the API function
        setLoading(false);
         setEmailData( { email: '',  subject: '', comments: '' })
        } catch (error:any) {
          console.log('error', error);
         setEmailData( { email: '',  subject: '', comments: '' })

        }
    }

  return (
    <> 
    <Container bg="primary.box" rounded="md" mb="3" maxW="100%" w="100%" p={2}>
                        <HStack alignItems={["flex-start","center"]} px="6" pb={3} pt={3} flexDirection={['column', 'row']}  w="100%">
                            <FormControl isRequired isInvalid={emailData.email.trim().length < 3 && emailData.email.trim().length > 0} alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <FormControl.Label  fontWeight="500" fontSize="16px"
                                >
                                     <Text  isTruncated fontWeight="500" fontSize="16px">
                                    {event?.labels?.GENERAL_EMAIL}
                                     </Text>
                                </FormControl.Label>
                            </FormControl>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
									placeholder={event?.labels?.GENERAL_EMAIL}	
                                    type={'text'}
                                    isRequired={true}		
                                    onChangeText={(text) => setEmailData({ ...emailData, email: text })}
                                    value={emailData.email}
                                    h={'50px'}
                                />
                                {!emailRegex.test(emailData.email.trim())  && errors.email && <Text color={'red.400'}>{errors.email}</Text>}
                            </Center>
                        </HStack>
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <FormControl.Label isRequired isInvalid={emailData.subject.trim().length < 3 && emailData.subject.trim().length > 0} alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text  isTruncated fontWeight="500" fontSize="16px">{event?.labels?.GENERAL_SUBJECT}</Text>
                            </FormControl.Label>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                               type={'text'}
                               isRequired={true}	
                                placeholder={event?.labels?.GENERAL_SUBJECT}
								h={'50px'}
                                onChangeText={(text) => setEmailData({ ...emailData, subject: text })}
                                value={emailData.subject}

                                />
                                      {emailData.subject=='' && errors.subject && <Text color={'red.400'}>{errors.subject}</Text>}
                            </Center>
                        </HStack>
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <FormControl.Label isInvalid={emailData.comments.trim().length < 3 && emailData.comments.trim().length > 0} alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
                            </FormControl.Label>
                            <Center borderWidth={'0'} justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <TextArea
                               bg="primary.darkbox" borderColor={'primary.darkbox'}
                                placeholder={event?.labels?.GENERAL_YOUR_COMMENT}
                                autoCompleteType={''}
                                w="100%"
								h={'100px'}
                                isRequired={true}
                                fontSize={'md'}
                                onChangeText={(text) => setEmailData({ ...emailData, comments: text })}
                                                        value={emailData.comments}
                                />
                            </Center>
                                  {emailData.comments=='' && errors.comments && <Text color={'red.400'}>{errors.comments}</Text>}
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
                    onPress={()=>validateForm()}
                  
                >
                    <Text fontSize="2xl" fontWeight={600}>{event?.labels?.GENERAL_SEND_EMAIL}</Text>
                </Button>
    </>


  )
}

export default EmailSend