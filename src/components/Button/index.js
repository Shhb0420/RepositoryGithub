import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({title = '', disabled = false, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        ...styles.btn,
        ...{backgroundColor: disabled ? '#CAE3FD' : '#2A99FF'},
      }}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 57,
    maxHeight: 57,
    borderRadius: 25,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#fff',
  },
});

export default Button;
