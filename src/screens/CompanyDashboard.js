import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  BackHandler
} from "react-native";

import { connect } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';


function CompanyDashboard(props) {
  const login = props.login;

  useEffect(() => {
    if (login === false) {
      props.navigation.navigate("Home");
    }
  }, [login]);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    })
  );


  return (
    <View style={styles.cont}>
      <TouchableOpacity
        style={styles.buttonsCont}
        activeOpacity={0.5}
        onPress={() => {
          props.navigation.navigate("All Students Details");
        }}
      >
        <Text style={styles.button}>View All Students Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  button: {
    color: "#ffffff",
    fontSize: 24,
  },
  buttonsCont: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#2d2f6a",
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2d2f6a",
    marginBottom: 10,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(CompanyDashboard);
