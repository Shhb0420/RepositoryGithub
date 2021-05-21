import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import {logo} from '../../assets';
import axios from 'axios';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const empty = () => {
    if (username === '') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        console.log('success', res);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('err', err.response.status);
        if (err.response.status === 404) {
          setErrMsg('Username tidak ditemukan!');
        }
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View styles={styles.header}>
        <FastImage
          source={logo}
          style={{
            width: 300,
            height: 90,
            alignSelf: 'center',
            marginTop: '40%',
            backgroundColor: '#6A6A6A',
            borderRadius: 12,
          }}
          tintColor={'black'}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            alignSelf: 'center',
            fontWeight: '600',
          }}>
          Hello, Welcome to github apps
        </Text>
        <View style={styles.form}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholder="Masukkan username kamu disini"
          />
          <Text
            style={{
              color: 'red',
              fontSize: 15,
              alignSelf: 'center',
              marginVertical: 7,
            }}>
            {errMsg}
          </Text>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 8,
              width: 300,
              alignSelf: 'center',
            }}>
            <Button title="Submit" disabled={empty()} onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    width,
    height,
  },
  form: {
    marginTop: 30,
    height: '100%',
    alignSelf: 'center',
  },
  input: {
    height: 50,
    marginHorizontal: 12,
    borderWidth: 0.5,
    paddingHorizontal: 30,
    backgroundColor: '#EBF5FF',
    borderColor: '#2B99FF',
    borderRadius: 12,
    width: 300,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#6A6A6A',
    paddingLeft: 15,
    marginVertical: 3,
  },
});

export default Login;
