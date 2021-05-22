import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import StatusBar from '../../components/StatusBar';
import Button from '../../components/Button';
import {logo, octocat} from '../../assets';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(false);
  const [repo, setRepo] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  const empty = () => {
    if (username === '') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    <FastImage />;
  }, []);

  const handleSubmit = () => {
    axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        const dataRepo = res.data.map(item => {
          let getData = {
            repository: item.name,
            url: item.html_url,
            desc: item.description,
          };
          return getData;
        });

        setRepo(dataRepo);

        setUser(true);
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
      {user === false ? (
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
              <Button
                title="Submit"
                disabled={empty()}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={{marginVertical: 25, flexDirection: 'column'}}>
          <Image
            source={octocat}
            style={{width: 90, height: 90, alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 30,
              alignSelf: 'center',
              fontWeight: '700',
              fontFamily: 'Montserrat-Regular',
            }}>
            Repository List
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.git}>
            {repo &&
              repo.map(({repository, url, desc}) => {
                return (
                  <View key={repository} style={styles.subHeader}>
                    <Text
                      style={[
                        styles.repo,
                        {color: '#106494', lineHeight: 20, fontWeight: 'bold'},
                      ]}>
                      {repository}
                    </Text>
                    <Text style={styles.repo}>{desc}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(url)}>
                      <Text style={styles.repo}>{url}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      )}
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
  subHeader: {
    width: '90%',
    minHeight: 90,
    maxHeight: 150,
    borderColor: '#6A6A6A',
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    borderRadius: 14,
  },
  git: {
    alignSelf: 'center',
  },
  repo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
    marginVertical: 5,
  },
});

export default Login;
