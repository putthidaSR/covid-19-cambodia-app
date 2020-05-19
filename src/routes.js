/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Homepage from './components/screens/Homepage';
import WorldScreen from './components/screens/WorldScreen';
import HelpScreen from './components/screens/HelpScreen';

/**
 * This class represents the main layout of the application.
 */
export default class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={Homepage}
        >
          <Stack.Screen name="Home" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

/**
 * Bottom navigator tab for Homepage
 */
const MainBottomTab = createBottomTabNavigator();

function BottomTab() {
  return (
    <MainBottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions= {{
        activeTintColor: '#2980b9',
        backgroundColor: 'blue',
        inactiveTintColor: 'rgba(0,0,0,0.3)',
        labelStyle:{fontWeight: 'bold'},
        labelPosition: 'below-icon',
        style:{padding: 5, backgroundColor: 'white'}
      }}
    >
      <MainBottomTab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: 'Cambodia',
          tabBarIcon: () => (
            <Image
              style={{ width: 30, height: 25 }}
              source={require('./assets/images/cambodia-icon.png')}
            />
          )
        }}
      />

      <MainBottomTab.Screen
        name="WorldScreen"
        component={WorldScreen}
        options={{
          tabBarLabel: 'World Data',
          tabBarIcon: () => (
            <Image
              style={{ width: 25, height: 25 }}
              source={require('./assets/images/globe-icon.png')}
            />
          )
        }}
      />

      <MainBottomTab.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          tabBarLabel: 'More Info',
          tabBarIcon: () => (
            <Image
              style={{ width: 40, height: 40 }}
              source={require('./assets/images/help-icon.png')}
            />
          )
        }}
      />
    </MainBottomTab.Navigator>
  );
}
