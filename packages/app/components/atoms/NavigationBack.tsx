import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IcoBack from 'app/assets/icons/IcoBack';

const NavigationBack = () => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ marginLeft: 0 }} onPress={() => navigation.goBack()}>
      <IcoBack size={24} />
    </TouchableOpacity>
  );

};

export default NavigationBack;
