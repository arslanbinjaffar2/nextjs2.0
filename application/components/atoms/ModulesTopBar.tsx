import React from 'react'
import { Avatar, Box, HStack, Icon, ScrollView, IconButton, Container, View } from 'native-base'
import { StyleSheet } from 'react-native';
import IconWithBottomHeading from 'application/components/atoms/headings/IconWithBottomHeading'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import DynamicIcon from 'application/utils/DynamicIcon';

const ModulesTopBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} mx='20'>
        <Container w="100%" maxW="100%">
          <HStack my={5} space="10">
            <IconWithBottomHeading icon={<DynamicIcon iconType="speakers" iconProps={{ width: 30, height: 30 }} />} title="OUR Speakers" />
            <IconWithBottomHeading icon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 30, height: 30 }} />} title="OUR EXHIBITORS" />
            <IconWithBottomHeading icon={<DynamicIcon iconType="agendas" iconProps={{ width: 30, height: 30 }} />} title="OUR PROGRAMS" />
            <IconWithBottomHeading icon={<DynamicIcon iconType="chat" iconProps={{ width: 30, height: 30 }} />} title="CHATS" />
            <IconWithBottomHeading icon={<DynamicIcon iconType="polls" iconProps={{ width: 30, height: 30 }} />} title="POLLS" />
            <IconWithBottomHeading icon={<DynamicIcon iconType="survey" iconProps={{ width: 30, height: 30 }} />} title="Survey" />
          </HStack>
        </Container>
      </ScrollView>
      <Box position={'absolute'} style={{ right: 15, top: '30%' }}>
        <IconButton
          p="0"
          w="40px"
          variant="transparent"
          icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
          onPress={() => {
            console.log('hello')
          }}
        />
      </Box>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});

export default ModulesTopBar