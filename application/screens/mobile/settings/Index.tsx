import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import { Avatar, Box, Center, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import UseEventService from 'application/store/services/UseEventService';
import DynamicIcon from 'application/utils/DynamicIcon';
import { useRouter } from 'solito/router';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
    const router = useRouter()
    const { event, setting_modules } = UseEventService();

  return (
    <Master>
      <Center px={'0'} w="100%" maxW="100%" >
        {setting_modules.map((row: any, key: any) =>
            <Pressable
                key={key}
                w="100%"
                px="4"
                py="2"
                _hover={{ bg: 'primary.500' }}
                borderRadius="4"
                onPress={() => {
                    router.push(`/${event.url}/settings/${row?.alias}`)
                }}>
                <HStack space="4" alignItems="center">
                <Center w="30px">
                    <DynamicIcon iconType={'attendees'} iconProps={{ width: 24, height: 21 }} />
                </Center>
                 <Text fontSize={'lg'} color="primary.text">{row?.name}</Text>
                </HStack>
            </Pressable>
            )}
    </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
