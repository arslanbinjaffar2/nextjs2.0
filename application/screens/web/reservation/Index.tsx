import * as React from 'react';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import { Button, Container, HStack, Spacer, Text } from 'native-base';
import RectangleView from 'application/components/atoms/reservation/RectangleView';

const Index = () => {
const [tab, setTab] = React.useState('all');
  return (
      <>
      <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
        <Text fontSize="2xl">
            Reservation
        </Text>
        <Spacer />
         <DateTimePicker readOnly={false} label={"DD-MM-YYYY"}  />
      </HStack>
      <HStack mb="3" space={1} overflow={'hidden'} rounded={8} flexWrap={'wrap'} justifyContent="center" w="100%">
        <Button 
            onPress={() => {setTab('all')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.darkbox" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'all' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          All
        </Button>
        <Button 
            onPress={() => {setTab('accepted')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.boxbutton" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'accepted' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          Accepted
        </Button>
        <Button 
            onPress={() => {setTab('rejected')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.boxbutton" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'rejected' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          Rejected
        </Button>
      </HStack>
      <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
          {tab === 'all' && <>
              {[...Array(5)].map((item,k) =>
                <React.Fragment key={k}>
                  <RectangleView  border={k} type='all'/>   
                </React.Fragment>
              )}
          </>}
          {tab === 'accepted' && <>
              {[...Array(5)].map((item,k) =>
                <React.Fragment key={k}>
                  <RectangleView  border={k} type='accepted'/>   
                </React.Fragment>
              )}
          </>}
          {tab === 'rejected' && <>
              {[...Array(5)].map((item,k) =>
                <React.Fragment key={k}>
                  <RectangleView  border={k} type='rejected'/>   
                </React.Fragment>
              )}
          </>}
      </Container>
      </>
  );

};

export default Index;
