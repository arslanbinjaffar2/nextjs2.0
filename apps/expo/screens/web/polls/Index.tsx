import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Divider, HStack, Icon, Input, Spacer, Text} from 'native-base';
import Master from 'screens/web/layouts/Master';
import {AntDesign} from '@expo/vector-icons';
import BoxItem from 'app/components/atoms/polls/BoxItem';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  const [tab, setTab] = React.useState(true)
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Polls</Text>
          <Spacer />
          <Input  rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <HStack mb="3" space={1} justifyContent="center" w="100%">
          <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>ACTIVE</Button>
          <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>COMPLETED</Button>
        </HStack>
        <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
          <BoxItem/>
          <Divider h="100px" bg="transparent" />
          
        </Box>
        
      </Container>
      
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
