import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';

const Stack = createStackNavigator();

const MainRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainRouter;
