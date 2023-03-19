import React from 'react'
import { Avatar, Box, HStack, Icon, ScrollView, IconButton, Container, View } from 'native-base'
import IcoSpeaker from 'application/assets/icons/IcoSpeaker';
import { StyleSheet } from 'react-native';
import IconWithBottomHeading from 'application/components/atoms/headings/IconWithBottomHeading'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import IcoExhibitors from 'application/assets/icons/IcoExhibitors';
import IcoProgram from 'application/assets/icons/IcoProgram';
import IcoChat from 'application/assets/icons/IcoChat';
import IcoPolls from 'application/assets/icons/IcoPolls';
import IcoSurvey from 'application/assets/icons/IcoSurvey';

const ModulesTopBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} mx='20'>
        <Container w="100%" maxW="100%">
          <HStack my={5} space="10">
            <IconWithBottomHeading icon={<IcoSpeaker width="30" height="30" />} title="OUR Speakers" />
            <IconWithBottomHeading icon={<IcoExhibitors width="30" height="30" />} title="OUR EXHIBITORS" />
            <IconWithBottomHeading icon={<IcoProgram width="30" height="30" />} title="OUR PROGRAMS" />
            <IconWithBottomHeading icon={<IcoChat width="30" height="30" />} title="CHATS" />
            <IconWithBottomHeading icon={<IcoPolls width="30" height="30" />} title="POLLS" />
            <IconWithBottomHeading icon={<IcoSurvey width="30" height="30" />} title="Survey" />
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