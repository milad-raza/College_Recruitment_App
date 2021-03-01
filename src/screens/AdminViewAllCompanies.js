import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Card,
  CardItem,
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from "react-redux";
import database from "@react-native-firebase/database";

function AdminViewAllCompanies(props) {
  const [loader, setLoader] = useState(true);
  const [students, setStudents] = useState([]);

  const login = props.login;

  const deleteData = (uid) => {
      database()
      .ref(`College_Recruitment_Companies/${uid}`)
      .remove()
  }

  useEffect(() => {
    if (login === false) {
      props.navigation.navigate("Home");
    }
  }, [login]);

  useEffect(() => {
    database()
      .ref("College_Recruitment_Companies")
      .on("value", function (snapshot) {
        setStudents([]);
        snapshot.forEach(function (childSnapshot) {
          let data = childSnapshot.val();
          setStudents((students) => [...students, data]);
        });
        setLoader(false);
      });
  }, []);

  return (
    <Container style={{ backgroundColor: "#e5e5e5" }}>
      {loader ? (
        <ActivityIndicator size="large" color="#000000" style={{ flex: 1 }} />
      ) : (
        <ScrollView>
          {students.map((student, index) => {
            return (
              <Content key={index}>
                <Card>
                    
                    <Icon
                    style={styles.delete}
                      name="delete"
                      size={30}
                      color="#2d2f6a"
                      onPress={() => {
                        deleteData(student.user)
                      }} />
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>Name: {student.name}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>City: {student.city}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>Email: {student.email}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>Mobile: {student.mobile}</Text>
                  </CardItem>
                </Card>
              </Content>
              
            );
          })}
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  name: {
    fontSize: 20,
    fontFamily: "sans",
    color: "#214151",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  name1: {
    fontSize: 16,
    fontFamily: "sans",
    color: "#214151",
    fontWeight: "bold",

  },
  view: {
    borderColor: "red",
    borderWidth: 1.6,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
  },
  card: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  delete: {
      marginLeft: "80%",
      marginTop: 20
  }
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(AdminViewAllCompanies);
