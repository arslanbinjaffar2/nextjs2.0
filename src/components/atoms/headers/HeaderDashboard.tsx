
import * as React from 'react';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { Center, Flex, Image, Pressable, Icon, Box, View, VStack, HStack } from 'native-base';
import { images } from '@src/styles'
import IcoBell from '@src/assets/icons/IcoBell'
import { useEffect } from 'react';

const HeaderDashboard = ({navigation,minimal}: any) => {
  const width = Dimensions.get('window').width;
  useEffect(() => {
  console.log(minimal);
    
  }, [minimal])
  return (
    <View>
      <Flex pt="3" direction="row" alignItems="center" safeAreaTop>
        <Center pt="10px" w="75px">
          <Pressable
            onPress={()=>{
              navigation.toggleDrawer();
            }}
          >
            <Icon size="2xl" color="primary.text" as={MaterialIcons} name="menu"  />
          </Pressable>
        </Center>
        <Center  w={width - 150}><Image alt='logo' source={images.Logo} w="180px" h="39px" alignSelf={'center'} /></Center>
        <Center w="75px">
          <Box>
            <IcoBell width={20} height={26} />
          </Box>
          
        </Center>
      </Flex>
    
    </View>

  )
}
export default  HeaderDashboard;