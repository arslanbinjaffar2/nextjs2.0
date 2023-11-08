import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, HStack, Icon, Spacer, Text, Pressable, Box } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Master from 'application/screens/web/layouts/Master';
import Detail from 'application/components/templates/event_info/Detail';
import UseInfoService from 'application/store/services/UseInfoService';
import { useRouter } from 'solito/router'
import { createParam } from 'solito';
import UseEventService from 'application/store/services/UseEventService';

type ScreenParams = { id: any, cms: any }

const { useParam } = createParam<ScreenParams>()

const PageDetail = (props: any) => {

  const { page, FetchPage, parent_folder } = UseInfoService();

  const { push } = useRouter()

  const [cms] = useParam('cms');

  const [id] = useParam('id');

  const { event } = UseEventService();

  React.useEffect(() => {
    if (id && cms) {
      FetchPage({ id: Number(id), type: cms });
    }
  }, [id, cms]);

  return (
    <Master>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
          <HStack space="3" alignItems="center">
            <Pressable
              onPress={() => {
                if(cms !== 'information-pages'){
                  push(`/${event.url}/${cms}/event-info/${parent_folder}`)
                }else{
                  push(`/${event.url}/${cms}/${parent_folder}`)
                }
              }}
            >
              <HStack>
                <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                <Text fontSize="2xl">BACK</Text>
              </HStack>
            </Pressable>
          </HStack>
          <Text fontSize="xl">{page.name}</Text>
          <Box minWidth={70}> </Box>
        </HStack>
        <Detail />
      </Container>
    </Master>
  );
};

export default PageDetail;
