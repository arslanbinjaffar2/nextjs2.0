import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IcoBack from '@src/assets/icons/IcoBack';


const NavigationBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{marginLeft: 0}} onPress={() => navigation.goBack(null)}>
      <IcoBack  />
    </TouchableOpacity>
  );
};
export default NavigationBack;
