import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { List, ListItem } from "native-base";
import { connect } from "react-redux";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

function StudentProfile(props) {
  const login = props.login;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [institute, setInstitute] = useState("");
  const [education, setEducation] = useState("");
  const [marks, setMarks] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");
  const [notAvail,setNotAvail] = useState(false)

  useEffect(() => {
    if (login === false) {
      props.navigation.navigate("Home");
    }
  }, [login]);

  useEffect(() => {
    auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user.uid);
      }
    });

    database()
    .ref(`College_Recruitment_Students/${user}`)
      .on('value', function (data) {
        console.log(data.val())
        setName(data.val().name)
        setCity(data.val().city)
        setEmail(data.val().email)
        setMobile(data.val().mobile)
          setInstitute(data.val().institute)
          setEducation(data.val().education)
          setMarks(data.val().marks)
          setInterest(data.val().interest)

          setInstitute(data.val().institute)
          setEducation(data.val().education)
          setMarks(data.val().marks)
          setInterest(data.val().interest)
       
        setTimeout(() => {
          // if(data.val().institute !== undefined){

          // }
          // else{
          //   setNotAvail(true)
          // }
        setLoading(false)
        }, 500);
      });

  });

  return (
    <View style={styles.cont}>
      {loading
      ?
      (
        <ActivityIndicator size="large" color="#000000" />
      )
      :
      (
        <List>
        <ListItem>
          <Text style={styles.name}>
            Name : <Text>{name}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            City : <Text>{city}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            Email : <Text>{email}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            Mobile : <Text>{mobile}</Text>
          </Text>
        </ListItem>
        <>
        {
          notAvail
          ?
          (
            null
          )
          :
          (
            <>
             <ListItem>
          <Text style={styles.name}>
            Institute : <Text>{institute}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            Education : <Text>{education}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            Marks in Last Exam : <Text style={styles.email}>{marks}</Text>
          </Text>
        </ListItem>
        <ListItem>
          <Text style={styles.name}>
            Area of Interest : <Text style={styles.email}>{interest}</Text>
          </Text>
        </ListItem>
            </>
          )
        }
       
        </>
      </List>
      )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontFamily: "sans",
    fontWeight: "bold",
    color: "#214151",
    textTransform: "capitalize",
  },
  email: {
    fontSize: 15,
    fontFamily: "sans",
    fontWeight: "bold",
    color: "#214151",
    textTransform: "lowercase",
  },
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(StudentProfile);
