import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, TextArea, Button, Slider } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';
import MultipleAnswer from 'application/components/atoms/surveys/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/surveys/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/surveys/DropdownAnswer';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  const [steps, setsteps] = useState<number>(0);
  const [completed, setcompleted] = useState<boolean>(true);
  return (
    <Master>
      <Container mb="3" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
            <Text fontSize="2xl">BACK</Text>
          </HStack>
          <Spacer />
          <Text isTruncated pr="6" fontSize="lg">Tillykke med valget som tilli…</Text>
        </HStack>
        <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
          <Box bg={steps >= 0 ? 'primary.500' : 'transparent'} h="22px" w="33.33%" />
          <Box borderLeftWidth="1" borderColor="primary.bdBox" bg={steps > 0 ? 'primary.500' : 'transparent'} h="22px" w="33.33%" />
          <Box borderLeftWidth="1" borderColor="primary.bdBox" bg={steps > 1 ? 'primary.500' : 'transparent'} h="22px" w="33.33%" />
        </HStack>
        {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
          {steps === 0 && <MultipleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs? Does it include cardio and weights?" />}
          {steps === 1 && <SingleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs?" />}
          {steps === 2 && <DropdownAnswer req={true} title="Are DAMY Programs designed for men or women?" />}
          <Box py="0" px="4" w="100%">
            <Divider mb="15" opacity={0.27} bg="primary.text" />
            <HStack mb="3" space="3" alignItems="center">
              {steps > 0 && <Button
                isDisabled={steps <= 0 ? true : false}
                bg="transparent"
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                colorScheme="primary"
                onPress={() => {
                  setsteps(steps - 1);
                }}
              >
                previous
              </Button>}
              <Spacer />
              {steps < 2 && <Button
                bg="transparent"
                isDisabled={steps >= 2 ? true : false}
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                colorScheme="primary"
                onPress={() => {
                  setsteps(steps + 1);
                }}
              >
                next
              </Button>}
            </HStack>
            {steps === 2 && <Box w="100%" mb="6">
              <Box m="auto" w="230px" bg="primary.darkbox" p="0" rounded="sm" overflow="hidden">
                <Button
                  w="48px"
                  py="3"
                  px="1"
                  leftIcon={<IcoLongArrow />}
                  colorScheme="primary"
                  onPress={() => {
                    setcompleted(true)
                  }}
                />
              </Box>
            </Box>}
          </Box>
        </Box>}
        {completed && <Box borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
          <VStack alignItems="center" space="5">
            <Box bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.text" rounded="100%" alignItems="center" justifyContent="center">
              <Icon size="4xl" color="primary.text" as={Ionicons} name="checkmark" />
            </Box>
            <Text fontSize="lg">Thanks for submitting.</Text>
          </VStack>
        </Box>}
      </Container>
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
