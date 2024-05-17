import React from 'react'
import CustomNotes from 'application/components/atoms/myNotes/CustomNotes'
import { View, VStack, Box, Text } from 'native-base'
import UseEventService from 'application/store/services/UseEventService';
import UseNoteService from 'application/store/services/UseNoteService';
import { useRouter } from 'next/router';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';

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
    }, 3500);
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