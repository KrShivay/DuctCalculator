import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GetJsonData} from './src/asyncStorage';
import Dashboard from './src/components/Dashboard';
import LoadingScreen from './src/components/LoadingScreen';
import Login from './src/components/Login';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0474a4',
    accent: '#f1c40f',
  },
};

const Stack = createNativeStackNavigator();

const getScreen = (data: userDataProp) => {
  if (data?.userName && data?.mobileNo) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    );
  }
};

type userDataProp = {
  email?: string;
  mobileNo: string;
  userName: string;
};

export default function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userData, setUserData] = React.useState<userDataProp>({
    email: '',
    mobileNo: '',
    userName: '',
  });

  React.useEffect(() => {
    const getuserData = async () => {
      const data = await GetJsonData('userDetails');
      if (data) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setUserData(data);
      } else if (!data) {
        setLoading(false);
      }
    };
    getuserData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>{getScreen(userData)}</NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
