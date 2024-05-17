import React from 'react'
import CustomNotes from 'application/components/atoms/myNotes/CustomNotes'
import { HStack, Icon, Input, Spacer, Text, View, VStack, Box } from 'native-base'
import { UseEventService } from 'application/store/services';
import UseNoteService from 'application/store/services/UseNoteService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'next/router';
const Details = () => {
  const router = useRouter();
  const { type } = router.query;
  const Moduletype: any = type
  const { event } = UseEventService();
  const { myTypeNotes, FetchMyNotesByType } = UseNoteService();
  const { loading } = UseLoadingService();
  const [initialLoader, setLoader] = React.useState(true)

  React.useEffect(() => {
    FetchMyNotesByType({ note_type: Moduletype });
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [Moduletype]);

  const handleUpdate = () => {
    FetchMyNotesByType({ note_type: Moduletype });
  };
  return (
    <>
      {(loading || initialLoader) ? (
        <SectionLoading />
      ) : (
        <>
          <HStack display={["block", "flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
            <Spacer />
            <Input rounded="10" w={['100%', '60%']} bg="primary.box" borderWidth={0}
              borderColor={'transparent'}
              placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {

              }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          </HStack>
          <VStack bg={"primary.box"} rounded={'10px'} width={'100%'}>
            {myTypeNotes && myTypeNotes.notes && myTypeNotes.notes.length > 0 ? (
              myTypeNotes.notes.map((note: any, key: number) => (
                <React.Fragment>
                  <CustomNotes key={key} type={Moduletype} note={note} onUpdate={handleUpdate} />
                  {myTypeNotes.notes.length - 1 > key && (
                    <View borderBottomColor={'primary.border'} borderBottomWidth={1} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Box p={3} bg="primary.box" rounded="lg" w="100%">
                <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
              </Box>
            )}
          </VStack>
        </>
      )}
    </>
  )
}
export default Details