import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
//import { signInWithGoogle } from '../../actions/firebaseAuth';
import { auth, provider } from '../../config/FirebaseConfig';
import GoogleButton from 'react-google-button';
import { signInWithRedirect } from 'firebase/auth';

const LoginScreen = () => {
  function signUp(){
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        // name = user.displayName
        // email = user.email

        Alert(user.displayName);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View>
      <Text>Connectez-vous avec Google</Text>
      <GoogleButton onClick={signUp} />
    </View>
  );
};

export default LoginScreen;
