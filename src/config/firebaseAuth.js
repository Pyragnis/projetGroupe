/*import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

GoogleSignin.configure({
  webClientId: 'VOTRE_CLIENT_ID',
});

export const signInWithGoogle = () => async (dispatch) => {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const signOutWithGoogle = () => async (dispatch) => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
*/