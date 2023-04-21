import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { View, Text } from "react-native";
import auth from '@react-native-firebase/app';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Bandeau from '../../components/banderol';
import BackgroundImage from '../../components/PersonnalBackground';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled(GoogleSigninButton)`
  width: 300px;
  height: 65px;
  margin-top: 300px;
`;

export default function LoginGoogle({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '323250229849-kqi2p5t2k1rfehd8g0661coilho9tpoj.apps.googleusercontent.com'
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);

    if (user) {
      // User is signed in, redirect to home page
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user);
    })
      .catch((error) => {
        console.log(error);
      })
  }

  if (initializing) return null;

  if (!user) {
    return (
      <BackgroundImage source={require('../../../public/LogoF-vert.png')}>
        <Container>
          <Title>Google Authentification</Title>
          <Bandeau source={require('../../../public/LogoN-vert.png')} />
          <Button onPress={onGoogleButtonPress} />
        </Container>
      </BackgroundImage>
    )
  }
}

