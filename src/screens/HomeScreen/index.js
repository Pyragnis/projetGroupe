import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text> coucou ça marche</Text>
    </View>
  ); 
};



export default Index;
