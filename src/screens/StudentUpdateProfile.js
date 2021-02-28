import React, {useRef, useState, useEffect} from 'react';
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
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import { connect } from "react-redux";

function StudentUpdateProfile(props) {

    const [user,setUser] = useState("")

    useEffect(()=>{
        auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user.uid)
            }
    })
},[])

    const passwordInput = useRef();
    const educationInput = useRef();
    const marksInput = useRef();
    const interestInput = useRef()
    const [institute, setInstitute] = useState('');
    const [education,setEducation] = useState('')
    const [interest,setInterest] = useState('')
    const [marks,setMarks] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  const login = props.login;

  useEffect(() => {
    if (login === false) {
      props.navigation.replace("Home");
    }
  }, [login]);

  const number = /^(0|[1-9]\d*)$/

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (institute === "" || institute === " ") {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please Enter Valid Institute Name!',
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert("Error",'Please Enter Valid Institute Name!');
      }
    } else if (education === "" || education === " ") {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Enter Valid Education!', ToastAndroid.SHORT);
      } else {
        Alert.alert("Error",'Please Enter Valid Education!');
      }
    }
    else if (marks === "" || marks === " " || number.test(marks) === false) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Please Enter Valid Marks!', ToastAndroid.SHORT);
        } else {
          Alert.alert("Error",'Please Enter Valid Marks!');
        }
      }
    else if (interest === "" || interest === " ") {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Please Enter Valid Area of Interest!', ToastAndroid.SHORT);
        } else {
          Alert.alert("Error",'Please Enter Valid Area of Interest!');
        }
      }
      
    
    else {
      setLoading(true);
      Keyboard.dismiss();
      updateUser();
    }
  };






  const updateUser = () => {
    database()
    .ref(`College_Recruitment_Students/${user}`)
    .update({
      institute,
      education,
      marks,
      interest
    })
    .then(function () {
          setLoading(false);
          setInstitute('')
          setEducation('')
          setMarks('')
          setInterest('')
          if (Platform.OS === 'android') {
            ToastAndroid.show('Posted Successfully', ToastAndroid.LONG);
          } else {
            Alert.alert('Error', 'Posted Successfully');
          }
          props.navigation.replace('Student Dashboard');
        })
        .catch(function (error) {
          setLoading(false);

          if (Platform.OS === 'android') {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
          } else {
            Alert.alert('Error', error.message);
          }
        });
    }
  



  return (
    <Container style={{justifyContent: 'center', flex:1, backgroundColor: "#e5e5e5"}}>
      <Form>
        <Item stackedLabel>
          <Label>Institute Name</Label>
          <TextInput
            value={institute}
            style={styles.inputs}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={(e) => {
              setInstitute(e);
            }}
            onSubmitEditing={() => educationInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Education</Label>
          <TextInput
            value={education}
            style={styles.inputs}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="none"
            ref={educationInput}
            onChangeText={(e) => {
              setEducation(e);
            }}
            onSubmitEditing={() => marksInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Marks In Last Examination</Label>
          <TextInput
            value={marks}
            style={styles.inputs}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="none"
            ref={marksInput}
            onChangeText={(e) => {
              setMarks(e);
            }}
            onSubmitEditing={() => interestInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Area of Interest</Label>
          <TextInput
            value={interest}
            underlineColorAndroid="transparent"
            selectionColor="rgba(0, 0, 0, 0.5)"
            style={styles.inputs}
            ref={interestInput}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(e) => {
              setInterest(e);
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
              'Update'
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

  const mapStateToProps = (state) => ({
    login: state.Login.login,
  });

export default connect(mapStateToProps)(StudentUpdateProfile);

