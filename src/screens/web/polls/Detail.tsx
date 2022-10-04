import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, TextArea, Button } from 'native-base';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'
import Master from '@src/screens/web/layouts/Master';
import { useState } from 'react';
import MultipleAnswer from '@src/components/atoms/surveys/MultipleAnswer';
import SingleAnswer from '@src/components/atoms/surveys/SingleAnswer';
import DropdownAnswer from '@src/components/atoms/surveys/DropdownAnswer';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  const [steps, setsteps] = useState<string | null>(0);
  return (
    <Master navigation={navigation}>
      <Container mb="3" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack  space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
            <Text  fontSize="2xl">BACK</Text>
          </HStack>
          <Spacer />
          <Text isTruncated pr="6" fontSize="lg">Tillykke med valget som tilli…</Text>
        </HStack>
        <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
          <Box bg="primary.500" h="22px" w="33.33%" />
          <Box borderLeftWidth="1" borderColor="primary.bdBox" bg="primary.500" h="22px" w="33.33%" />
          <Box borderLeftWidth="1" borderColor="primary.bdBox"  bg="transparent" h="22px" w="33.33%" />
        </HStack>
        <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
          {steps === 0 && <MultipleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs? Does it include cardio and weights?" />}
          {steps === 1 && <SingleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs?" />}
          {steps === 2 && <DropdownAnswer req={true} title="Are DAMY Programs designed for men or women?" />}
          <Box py="0" px="4" w="100%">
            <Divider mb="15" opacity={0.27} bg="primary.text" />
            <HStack mb="3" space="3" alignItems="center">
              <Button
                isDisabled={steps <= 0 ? true : false }
                bg="transparent"
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                colorScheme="primary"
                onPress={()=>{
                  setsteps(steps-1);
                }}
            
              >
              previous
              </Button>
              <Spacer />
              <Button
                bg="transparent"
                isDisabled={steps >= 2 ? true : false }
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                colorScheme="primary"
                onPress={()=>{
                  setsteps(steps+1);
                }}
            
              >
              next
              </Button>
            </HStack>
          </Box>
        </Box>
        
      </Container>
    </Master>

  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
