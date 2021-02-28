import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function SelectAccountType(props) {
    return (
        <View style={styles.cont}>
            <TouchableOpacity
          style={styles.buttonsCont}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Create An Account As Student');
          }}
          >
          <Text style={styles.button}>Student</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.buttonsCont}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Create An Account As Company');
          }}
          >
          <Text style={styles.button}>Company</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.buttonsCont}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Create An Account As Admin');
          }}
          >
          <Text style={styles.button}>Admin</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: "#e5e5e5"
    },
    button: {
      color: '#ffffff',
      fontSize: 24,
    },
    buttonsCont: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#2d2f6a',
      width: '76%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2d2f6a',
      marginBottom: 10,
      marginTop: 10,
    },
  });