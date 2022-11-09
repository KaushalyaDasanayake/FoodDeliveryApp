import { StyleSheet } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignupScreens/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignupScreens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/LoginSignupScreens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <WelcomeScreen />
    //<RootNavigation />

    //User Authintication
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage'>
        <Stack.Screen name="welcomepage" component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="signuppage" component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="loginpage" component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="homepage" component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
