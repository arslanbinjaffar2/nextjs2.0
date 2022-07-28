/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '@src/containers/Layout';
import HeaderDashboard from '@atoms/headers/HeaderDashboard';
import { Button, Center, Flex, Text, VStack, Image, Input, ScrollView, Box, Divider, Heading } from 'native-base';
import { useState } from 'react';

const MobileView = ({ navigation }: any) => {
  const [scroll, setscroll] = useState(false)
  return (
    <Layout>
      <HeaderDashboard minimal={scroll}  navigation={navigation} />
      <Center w={'100%'} px={15}>
        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
        
        <ScrollView  onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setscroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
          <VStack pb="2" space={0} alignItems="center" w="100%">
            <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
            <Heading fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
          </VStack>
          <VStack space={0} alignItems="center" w="100%">
            <Heading fontSize="lg" bold>DR Koncerthus</Heading>
            <Heading fontSize="lg" bold>STUDIO 2, 2300 København S</Heading>
          </VStack>
          
          <Text py="12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, mollitia, quod quisquam delectus illum, ducimus sed obcaecati tempore vitae error provident aut fuga illo non magnam odit? Atque, autem. Exercitationem!</Text>
          <Text py="12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, mollitia, quod quisquam delectus illum, ducimus sed obcaecati tempore vitae error provident aut fuga illo non magnam odit? Atque, autem. Exercitationem!</Text>
          <Text py="12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, mollitia, quod quisquam delectus illum, ducimus sed obcaecati tempore vitae error provident aut fuga illo non magnam odit? Atque, autem. Exercitationem!</Text>
          <Text py="12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, mollitia, quod quisquam delectus illum, ducimus sed obcaecati tempore vitae error provident aut fuga illo non magnam odit? Atque, autem. Exercitationem!</Text>
          <Text py="12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, mollitia, quod quisquam delectus illum, ducimus sed obcaecati tempore vitae error provident aut fuga illo non magnam odit? Atque, autem. Exercitationem!</Text>
        </ScrollView>
        
      </Center>
    </Layout>
  );
};

MobileView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MobileView;
