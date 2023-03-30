import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

//annuaire de toutes les pages de l'application par native-stack
const Router= () => {
    return( 
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginForm} /> 
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Router;