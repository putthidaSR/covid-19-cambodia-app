/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from './components/screens/Homepage';

/**
 * This class represents the main layout of the application.
 */
export default class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    console.log('this.props.isUserSignedIn', this.props.isUserSignedIn);
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={Homepage}
        >
          <Stack.Screen name="Home" component={Homepage} />
        {/**<Stack.Screen name="Signin" component={SignInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />**/}

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
