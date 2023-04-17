import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from 'react-native-vector-icons';

const Index = ({ onSearch, onClear }) => {
  const [text, setText] = useState('');

  const handleSearch = () => {
    onSearch(text);
  };

  const handleClear = () => {
    setText('');
    onClear();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Rechercher"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <AntDesign name="search1" size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleClear}>
        <AntDesign name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
});

export default Index;
