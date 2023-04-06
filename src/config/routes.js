import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsButton from '../components/SettingsButton';

const Stack = createNativeStackNavigator();

//annuaire de toutes les pages de l application par native-stack
//si le token n'est pas enregistrer dans async-storage, l utilisateur est deconnecté
const Router= () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          setIsLoggedIn(!!token);
        })
        .catch(err => {
          //ici rajouter notifee
          //console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
        });
    }, []);

    return( 
        <NavigationContainer>
        {isLoggedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home">
              {props => (
                <HomeScreen {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login">
              {props => (
                <Login {...props} onLogin={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
        <SettingsButton />
      </NavigationContainer>
    )
}

export default Router;