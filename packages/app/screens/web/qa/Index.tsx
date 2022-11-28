import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack, ZStack} from 'native-base';
import Master from 'app/screens/web/layouts/Master';
import {AntDesign,Entypo,Ionicons,SimpleLineIcons} from '@expo/vector-icons';
import BoxItem from 'app/components/atoms/exhibitors/BoxItem';
import IcoExhibitors from 'app/assets/icons/IcoExhibitors';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  const [tab, setTab] = React.useState(true)
  const [view, setView] = React.useState(true)
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Ask a question</Text>
        </HStack>
        <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
          {[...Array(4)].map((item, k) =>
            <Box w="100%" key={k} borderBottomWidth={k === 3 ? 0 : 1} borderColor="primary.text" py="3">
              <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                <Box position="absolute" left="0" top="0" w="15px">
                  <ZStack>
                    {[...Array(k + 1)].map((track, i) =>
                      <Box key={i} bg={`primary.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                    )}
                  </ZStack>
                </Box>
                <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                  <VStack  maxW={['62%', '70%', '40%']} space="1">
                    <Text fontSize="md" lineHeight="22px">
                        Alberto Mark Spancer Gloves
                    </Text>
                    <Text fontSize="sm" lineHeight="16px">
                      02 Dec 2021  -  01 Jan 2022 
                    </Text>
                      
                  </VStack>
                    
                  <Spacer />
                  <HStack pr="3" space="5" alignItems="center">
                    <IconButton
                      bg="transparent"
                      p="1"
                      _hover={{bg:'transparent'}}
                      icon={<Icon size="lg" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      onPress={()=>{
                        console.log('hello')
                      }}
                        
                    />
                  </HStack>
                </HStack>
              </HStack>
            </Box>)}
        </Box>
      </Container>
      
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
