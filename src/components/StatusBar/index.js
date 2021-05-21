import React from 'react';
import {StatusBar} from 'react-native';

const MyStatusBar = ({barStyle}) => {
  return (
    <StatusBar translucent backgroundColor="transparent" barStyle={barStyle} />
  );
};

export default MyStatusBar;
