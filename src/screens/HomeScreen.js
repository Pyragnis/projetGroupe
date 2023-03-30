import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text> coucou ça marche</Text>
    </View>
  ); 
};



export default HomePage;
