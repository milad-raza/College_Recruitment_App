import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';
import auth from '@react-native-firebase/auth';

export default function Login(props) {
  const passwordInput = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation = /^[A-Za-z[0-9]\w{7,}$/;

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (emailValidation.test(email) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please Enter Valid Email Address!',
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert("Error",'Please Enter Valid Email Address!');
      }
    } else if (passwordValidation.test(password) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Enter Valid Password!', ToastAndroid.SHORT);
      } else {
        Alert.alert("Error",'Please Enter Valid Password!');
      }
    } else {
      setLoading(true);
      Keyboard.dismiss();
      loginUser();
    }
  };

  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        setTimeout(() => {
          setEmail('');
          setPassword('');
          setLoading(false);
          props.navigation.navigate('Dashboard');
        }, 100);
      })
      .catch((error) => {
        setLoading(false);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Wrong Email Or Password!', ToastAndroid.LONG);
        } else {
          Alert.alert("Error",'Wrong Email Or Password!');
        }
      });
  };

  return (
    <Container style={{justifyContent: 'center', flex:1, backgroundColor: "#e5e5e5"}}>
      <Form>
        <Item stackedLabel>
          <Label>Email</Label>
          <TextInput
            value={email}
            style={styles.inputs}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={(e) => {
              setEmail(e);
            }}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Password</Label>
          <TextInput
            value={password}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            style={styles.inputs}
            ref={passwordInput}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(e) => {
              setPassword(e);
            }}
            onSubmitEditing={
              loading
                ? null
                : () => {
                    handleSubmit();
                  }
            }
          />
        </Item>
      </Form>
      <Text></Text>
      <Text></Text>

      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.loginCont}
          activeOpacity={0.5}
          disabled={loading ? true : false}
          onPress={() => {
            handleSubmit();
          }}>
          <Text style={styles.login}>
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              'Login'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: '#ffffff',
    fontSize: 24,
  },
  loginCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#2d2f6a',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2f6a',
  },
  inputs: {
    width: '100%',
    height: 40,
  },
});