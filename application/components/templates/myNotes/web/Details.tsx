import React, { useEffect, useState } from 'react';
import CustomNotes from 'application/components/atoms/myNotes/CustomNotes';
import { HStack, Icon, Input, Spacer, Text, View, VStack, Box } from 'native-base';
import { UseEventService } from 'application/store/services';
import UseNoteService from 'application/store/services/UseNoteService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'next/router';

const Details = () => {
  const router = useRouter();
  const { type } = router.query;
  const Moduletype: any = type;
  const { event } = UseEventService();
  const { myTypeNotes, FetchMyNotesByType } = UseNoteService();
  const { loading } = UseLoadingService();
  const [initialLoader, setLoader] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    FetchMyNotesByType({ note_type: Moduletype });
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [Moduletype]);

  useEffect(() => {
    filterNotes();
  }, [myTypeNotes, searchText]);

  const filterNotes = () => {
    if (searchText === '') {
      setFilteredNotes(myTypeNotes.notes);
    } else {
      let filtered:any = [];
      myTypeNotes.notes.forEach((note: any) => {
        const noteTextIncluded = note.notes.toLowerCase().includes(searchText.toLowerCase());
        switch (Moduletype) {
          case 'sponsors':
            if (note.sponsor_note && (noteTextIncluded || note.sponsor_note.name.toLowerCase().includes(searchText.toLowerCase()))) {
              filtered.push(note);
            }
            break;
          case 'exhibitors':
            if (note.exhibitor_note && (noteTextIncluded || note.exhibitor_note.name.toLowerCase().includes(searchText.toLowerCase()))) {
              filtered.push(note);
            }
            break;
          case 'programs':
            if (note.program_note && (noteTextIncluded || note.program_note.info.some((i: { name: string, value: string }) => i.name === 'topic' && i.value.toLowerCase().includes(searchText.toLowerCase())))) {
              filtered.push(note);
            }
            break;
          case 'directory':
            if (note.directory_note && (noteTextIncluded || note.directory_note.info.some((i: { name: string, value: string }) => i.name === 'name' && i.value.toLowerCase().includes(searchText.toLowerCase())))) {
              filtered.push(note);
            }
            break;
          default:
            if (noteTextIncluded) {
              filtered.push(note);
            }
            break;
        }
      });
      setFilteredNotes(filtered);
    }
  };
  
  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };
  
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
            <Input
              value={searchText}
              rounded="10"
              w={['100%', '60%']}
              bg="primary.box"
              borderWidth={0}
              borderColor={'transparent'}
              placeholder={event.labels?.GENERAL_SEARCH}
              onChangeText={handleSearchChange}
              leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />}
            />
          </HStack>
          <VStack bg={"primary.box"} rounded={'10px'} width={'100%'}>
            {filteredNotes && filteredNotes.length > 0 ? (
              filteredNotes.map((note:any, key) => (
                <React.Fragment key={note.id}>
                  <CustomNotes type={Moduletype} note={note} onUpdate={handleUpdate} />
                  {filteredNotes.length - 1 > key && (
                    <View borderBottomColor={'primary.bordercolor'} borderBottomWidth={1} />
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
  );
};

export default Details;
