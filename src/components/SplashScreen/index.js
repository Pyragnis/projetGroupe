import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../actions/SplashScreenLoader';

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../public/Loading.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default index;