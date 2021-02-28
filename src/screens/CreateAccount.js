import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Label,
  Button,
} from 'native-base';
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

export default function Signup(props) {
  const cityInput = useRef();
  const emailInput = useRef();
  const mobileInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();

  const [name,setName] = useState("")
  const [city,setCity] = useState("")
  const [email,setEmail] = useState("")
  const [mobile,setMobile] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const [loading,setLoading] = useState(false)

  const nameValidation = /([A-Za-z])\w/;
  const cityValidation = /([A-Za-z])\w/;
  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation = /^[A-Za-z[0-9]\w{7,}$/;

  const handleSubmit = ()=>{
    Keyboard.dismiss()
    if (nameValidation.test(name) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Name!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Name!");
      }
    }
    else if (cityValidation.test(city) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid City Name!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid City Name!");
      }
    }
    else if (emailValidation.test(email) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Email Address!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Email Address!");
      }
    }
    else if(mobile.length < 11){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Mobile Number!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Mobile Number!");
      }
    }
    else if (passwordValidation.test(password) === false){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Password!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Password!");
      }
    }
    else if (confirmPassword !== password){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Sorry Password Did Not Match!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Sorry Password Did Not Match!");
      }
    }
    else{
      setLoading(true)
      Keyboard.dismiss()
      createUser()
    }
  }

  const createUser = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then((e) => {
        let user = e.user.uid
        database().ref('Blood_Bank_Users/' + user).set({
          name,
          city,
          email,
          mobile,
          user,
        })
          .then(function () {
            setName("")
            setCity("")
            setEmail("")
            setMobile("")
            setPassword("")
            setConfirmPassword("")
            setLoading(false)
            props.navigation.replace('Home')
          })
          .catch(function (error) {
            setLoading(false)
            if (Platform.OS === 'android') {
              ToastAndroid.show(error.message, ToastAndroid.LONG)
            } else {
              Alert.alert("Error",error.message);
            }
          });

      })
      .catch((error) => {
        setLoading(false)
        if(error.code === "auth/email-already-in-use"){
        if (Platform.OS === 'android') {
          ToastAndroid.show("Email Already Exists", ToastAndroid.LONG)
        } else {
          Alert.alert("Error",error.message);
        }
      }
      else{
        if (Platform.OS === 'android') {
          ToastAndroid.show(error.message, ToastAndroid.LONG)
        } else {
          Alert.alert("Error",error.message);
        }
      }
      });
  };

  return (
    <Container style={{justifyContent:"center"}}>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={70}>
      <ScrollView keyboardShouldPersistTaps='handled'>
      <Form>
        <Item stackedLabel>
          <Label>Name</Label>
          <TextInput
            selectionColor='rgba(0, 0, 0, 0.5)'
            keyboardType="default"
            style={styles.inputs}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCorrect={false}
            onChangeText={(e)=>{setName(e)}}
            value={name}
            onSubmitEditing={() => cityInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>City</Label>
          <TextInput
            keyboardType="default"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={cityInput}
            returnKeyType="next"
            blurOnSubmit={false}
            autoCorrect={false}
            onChangeText={(e)=>{setCity(e)}}
            value={city}
            onSubmitEditing={() => emailInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <TextInput
            keyboardType="email-address"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={emailInput}
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize='none'
            onChangeText={(e)=>{setEmail(e)}}
            value={email}
            onSubmitEditing={() => mobileInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Mobile</Label>
          <TextInput
            keyboardType="numeric"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={mobileInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setMobile(e)}}
            value={mobile}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <TextInput
            secureTextEntry={true}
            style={styles.inputs}
            selectionColor='rgba(0, 0, 0, 0.5)'
            underlineColorAndroid="transparent"
            ref={passwordInput}
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(e)=>{setPassword(e)}}
            value={password}
            onSubmitEditing={() => confirmInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Confirm Password</Label>
          <TextInput
            secureTextEntry={true}
            selectionColor='rgba(0, 0, 0, 0.5)'
            underlineColorAndroid="transparent"
            ref={confirmInput}
            style={styles.inputs}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(e)=>{setConfirmPassword(e)}}
            value={confirmPassword}
            onSubmitEditing = {loading ? null : ()=>{handleSubmit()}}
          />
        </Item>
      </Form>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.createAccountCont}
          activeOpacity={0.5}
          disabled = {loading ? true : false}
          onPress={()=>{handleSubmit()}}
        >
          <Text style={styles.createAccount}>
            {loading ? <ActivityIndicator size="large" color="#ffffff" /> : "Create Account"}
            </Text>
        </TouchableOpacity>
      </View>
      <Text></Text>

      </ScrollView>
    </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccount: {
    color: '#ffffff',
    fontSize: 24,
  },
  createAccountCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#2d2f6a',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2f6a',
  },
  inputs:{
    width: '100%',
    height: 40
  },
});