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
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

type ScreenParams = { id: any, cms: any }

const { useParam } = createParam<ScreenParams>()

const PageDetail = (props: any) => {

  const { loading } = UseLoadingService();

  const { page, FetchPage, parent_folder, ClearState } = UseInfoService();

  const { push, back } = useRouter()
  const { modules } = UseEventService();

  const [cms] = useParam('cms');

  const [id] = useParam('id');

  const { event } = UseEventService();

  React.useEffect(() => {
    if (id && cms) {
      FetchPage({ id: Number(id), type: cms });
    }
    return () => {
        ClearState();
    }
  }, [id, cms]);

  let modifiedCms = cms;
  if (cms === 'information-pages') {
    modifiedCms = cms.replace(/-/g, '_');
  }  
  const module = modules.find((module) => module.alias === modifiedCms);

  return (
    <>
      {(loading || !page) ? (
        <SectionLoading />
      ) : (
      <Container pt="2" maxW="100%" w="100%">
        <NextBreadcrumbs module={module} title={page.name}/>
         <Text w={'100%'} mb={2} fontSize="2xl" textAlign={'center'} textBreakStrategy='simple'>{page.name}</Text>
        <Detail />
      </Container>
      ) }
    </>
  );
};

export default PageDetail;
