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

import { connect } from "react-redux";
import database from "@react-native-firebase/database";

function CompanyViewAllStudents(props) {
  const [loader, setLoader] = useState(true);
  const [students, setStudents] = useState([]);

  const login = props.login;

  useEffect(() => {
    if (login === false) {
      props.navigation.replace("Home");
    }
  }, [login]);

  useEffect(() => {
    database()
      .ref("College_Recruitment_Students")
      .on("value", function (snapshot) {
        setStudents([]);
        snapshot.forEach(function (childSnapshot) {
          let data = childSnapshot.val();
          if(data.interest !== undefined){
          setStudents((students) => [...students, data]);
        }
        });
        setLoader(false);
      });
  }, []);

  console.log(students);

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
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>Name: {student.name}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>City: {student.city}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>
                      Education: {student.education}
                    </Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>Marks: {student.marks}</Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>
                      Institute: {student.institute}
                    </Text>
                  </CardItem>
                  <CardItem style={styles.card}>
                    <Text style={styles.name1}>
                      Interested In: {student.interest}
                    </Text>
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
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(CompanyViewAllStudents);
