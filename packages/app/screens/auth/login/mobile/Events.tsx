import * as React from 'react';
import PropTypes from 'prop-types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Button, Center, Flex, Text, Image, HStack, VStack, Box, ScrollView, Pressable } from 'native-base';
import Layout from 'app/containers/mobile/Layout';

const Events = ({ navigation }: any) => {
  return (
    <Layout>
      <Center w={'100%'} pt="20" px={15}>
        <HStack mb="10px" space={0} justifyContent="center" w="100%">
          <Button borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg="primary.box" w="50%">ACTIVE</Button>
          <Button borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg="primary.darkbox" w="50%">EXPIRED</Button>
        </HStack>
        <ScrollView w="100%">
          <VStack pb={50} space="10px" w="100%">
            {[...Array(10).keys()].map((i) =>
              <Pressable
                key={i}
                onPress={() => navigation.navigate('dashboard')}
              >
                <Box key={i} bg="rgba(0,0,0,0.4)" rounded="10">
                  <Center borderBottomColor="rgba(255,255,255,0.2)" borderBottomWidth={1} px="15" py="10px">
                    <Image
                      source={{
                        uri: `https://wallpaperaccess.com/full/30${i}.jpg`
                      }}
                      alt="Alternate Text"
                      width="225px"
                      height="80px"
                    />
                  </Center>
                  <VStack py="10px" alignItems="flex-start">
                    <Flex direction='row' px="15px">
                      <MaterialIcons name="location-on" size={15} color="rgba(255,255,255,0.7)" />
                      <Text pl="5px" color="rgba(255,255,255,.7)">San Diego Club</Text>
                    </Flex>
                    <Flex direction='row' px="15px">
                      <MaterialIcons mr="5px" name="calendar-today" size={15} color="rgba(255,255,255,0.7)" />
                      <Text pl="5px" color="rgba(255,255,255,.7)">22 jun 2021 - 25 jun 2021</Text></Flex>
                  </VStack>
                </Box>
              </Pressable>
            )}
          </VStack>
        </ScrollView>
      </Center>
    </Layout>
  );
};

Events.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Events;
