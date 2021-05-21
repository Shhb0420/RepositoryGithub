import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRouter from './src/router';

const App = () => {
  return (
    <NavigationContainer>
      <MainRouter />
    </NavigationContainer>
  );
};

export default App;
