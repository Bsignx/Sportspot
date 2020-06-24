import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import {
  Saira_300Light,
  Saira_400Regular,
  Saira_500Medium,
  Saira_600SemiBold,
  Saira_700Bold,
  useFonts,
} from '@expo-google-fonts/saira';

import Routes from './src/routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Saira_300Light,
    Saira_400Regular,
    Saira_500Medium,
    Saira_600SemiBold,
    Saira_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
