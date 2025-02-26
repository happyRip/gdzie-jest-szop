/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import {tintColor, navDarkColor} from './src/constants/colors';
import PointsContextProvider from './src/context/PointsContextProvider';
import LanguageContextProvider from './src/context/LanguageContextProvider';
import {useEffect} from 'react';
import {PermissionsAndroid, Alert} from 'react-native';

export default function App() {
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.DENIED) {
          Alert.alert(
            'Uwaga',
            'Brak dostępu do lokalizacji. Twoja pozycja nie będzie wyświetlana na mapie.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: navDarkColor}}>
      <StatusBar
        barStyle={'light-content'}
        hidden={false}
        animated={true}
        translucent={false}
        backgroundColor={tintColor}
      />
      <LanguageContextProvider>
        <PointsContextProvider>
          <MainTabNavigator />
        </PointsContextProvider>
      </LanguageContextProvider>
    </SafeAreaView>
  );
}
