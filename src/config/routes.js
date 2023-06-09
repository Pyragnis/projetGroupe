import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ScannerISBN from '../components/ScannerISNB';
import CategoriesPage from '../screens/CategoriesPage';
import BookList from '../screens/BookList';
import CategorieFire from '../screens/CategorieFire';
import CategoryList from '../screens/CategorieList';
import DetailCategorie from '../screens/DetailCategorie';
import Settings from '../screens/SettingsScreen';


const Stack = createNativeStackNavigator();

//annuaire de toutes les pages de l'application par native-stack
const Router= () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
      AsyncStorage.getItem('token')
        .then(token => {
          setIsLoggedIn(!!token);
        })
        .catch(err => {
          // // console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
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
            <Stack.Screen name="Scanner">
              {props => (
                <ScannerISBN {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="CategorieList">
              {props => (
                <CategoryList {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Booklist">
              {props => (
                <BookList {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="DetailCategorie">
              {props => (
                <DetailCategorie {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Blibliotheque">
              {props => (
                <CategorieFire {...props} onLogout={() => setIsLoggedIn(false)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={Settings} />
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
      </NavigationContainer>
    )
}

export default Router;